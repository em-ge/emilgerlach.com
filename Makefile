ZIPFILE    := emilgerlach.com.zip
SERVER     := emil@dev
TARGET_DIR := emilgerlach.com
PORT       := 11000
USER       := emil

.PHONY: zip upload deploy restart status clean

# 1) Erzeuge ZIP (immer neu)
zip:
	@echo "Creating zip $(ZIPFILE)..."
	rm -f $(ZIPFILE)
	zip -r $(ZIPFILE) . \
	  -x '*.git*' \
	  -x .DS_Store \
	  -x Makefile \
	  -x node_modules/** \
	  -x "notes/**"

# 2) Hochladen, entpacken, Prozess neu starten
upload: zip
	@echo "Uploading $(ZIPFILE) to $(SERVER):~/"
	scp $(ZIPFILE) $(SERVER):~/

	@echo "Running remote deploy on $(SERVER)..."
	ssh $(SERVER) '\
	  set -e; \
	  echo "Checking unzip..."; \
	  if ! command -v unzip >/dev/null 2>&1; then echo "ERROR: unzip not found"; exit 1; fi; \
	  echo "Finding processes on port $(PORT)..."; \
	  if command -v lsof >/dev/null 2>&1; then \
	    PIDS=$$(lsof -t -i:$(PORT) 2>/dev/null || true); \
	  else \
	    PIDS=$$(ps -u $(USER) -o pid= -o args= | grep -i python3 | awk '\''{print $$1}'\'' | tr "\n" " "); \
	  fi; \
	  if [ -n "$$PIDS" ]; then \
	    echo "Killing $$PIDS"; \
	    kill $$PIDS || true; \
	    sleep 1; \
	  else \
	    echo "No processes on port $(PORT)"; \
	  fi; \
	  echo "Removing old directory $(TARGET_DIR)"; \
	  rm -rf $(TARGET_DIR); \
	  echo "Unzipping $(ZIPFILE) -> $(TARGET_DIR)"; \
	  unzip -o $(ZIPFILE) -d $(TARGET_DIR); \
	  echo "Starting new process (nohup) in $(TARGET_DIR)"; \
	  cd $(TARGET_DIR) && nohup ./start.sh > app.log 2>&1 & \
	'

	@echo "Cleaning local zip"
	rm -f $(ZIPFILE)

# 3) Komplettes Deploy (upload + remote start)
deploy: upload
	@echo "Deploy finished."
	@date "+%Y-%m-%d %H:%M:%S"

# 4) Nur neu starten (kein Upload)
restart:
	@echo "Restarting remote app on $(SERVER)..."
	ssh $(SERVER) '\
	  PIDS=$$(lsof -t -i:$(PORT) 2>/dev/null || true); \
	  if [ -n "$$PIDS" ]; then echo "Killing $$PIDS"; kill $$PIDS || true; sleep 1; fi; \
	  cd $(TARGET_DIR) && nohup ./start.sh > app.log 2>&1 & \
	  echo "Restarted"; \
	'

# 5) Remote status (zeigt PID und listet deploy-Ordner)
status:
	@echo "Remote status on $(SERVER):"
	ssh $(SERVER) '\
	  echo "---- lsof (port $(PORT)) ----"; \
	  lsof -i:$(PORT) 2>/dev/null || echo "No process on $(PORT)"; \
	  echo ""; \
	  echo "---- ls $(TARGET_DIR) ----"; \
	  ls -l $(TARGET_DIR) || echo "$(TARGET_DIR) not found"; \
	'

clean:
	rm -f $(ZIPFILE)
