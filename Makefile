.PHONY: *

zip:
	rm -f emilgerlach.com.zip && zip -r emilgerlach.com.zip . -x '*.git*' -x .DS_Store -x Makefile
	
upload: zip
	scp emilgerlach.com.zip emil@dev:~/ && \
	ssh emil@dev "rm -rf emilgerlach.com && unzip emilgerlach.com.zip -d emilgerlach.com" && \
	rm -f emilgerlach.com.zip

deploy: upload
	ssh emil@dev "kill $$(lsof -t -i:11000) || cd emilgerlach.com && ./start.sh &"
