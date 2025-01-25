.PHONY: *

zip:
	rm -f gerlach_webserver.zip && zip -r gerlach_webserver.zip . -x '*.git*' -x .DS_Store -x Makefile
	
upload: zip
	scp gerlach_webserver.zip emil@dev:~/ && ssh emil@dev "rm -rf gerlach_webserver && unzip gerlach_webserver.zip -d gerlach_webserver"

deploy: upload
	ssh emil@dev "kill $$(lsof -t -i:11000) || cd gerlach_webserver && ./start.sh &"