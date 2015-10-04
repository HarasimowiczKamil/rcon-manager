
default:
	@echo "init\n\tinit project"
	@echo "         _    ,-,    _       "
	@echo "  ,--, /: :\/': :`\/: :\     "
	@echo " |`;  ' `,'   `.;    `: |    "
	@echo " |    |     |  '  |     |.   "
	@echo " | :  |     |     |     ||   "
	@echo " | :. |  :  |  :  |  :  | \  "
	@echo "  \__/: :.. : :.. | :.. |  ) "
	@echo "       `---',\___/,\___/ /'  "
	@echo "            `==._ .. . /'    "
	@echo "                 `-::-'      "

init:
#	sudo echo "deb http://http.debian.net/debian jessie-backports main\n" >> /etc/apt/sources.list
	sudo apt-get update
	sudo apt-get install python g++ make git subversion software-properties-common nodejs
	curl -L http://git.io/n-install | bash
	npm install

.PHONY: init
