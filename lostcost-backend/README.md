# Lost Cost set up

## Lost Cost Postgres DB

How to get started with postgres

```powershell
# This portion is for Raspberry Pi
sudo -i -U postgres
```

```powershell
psql -U postgres

CREATE DATABASE my_osm_db;

\q

psql -d my_osm_db

CREATE EXTENSION postgis;

osm2pgsql -c -d my_osm_db -U postgres -H localhost -P 5432 --slim -C 2000 -W -S C:\Users\mahru\Downloads\osm2pgsql-bin\default.style bangladesh-latest.osm.pbf
```

## Lost Cost Docker setup for OSRM

List of getting started with docker setup using powershell

```powershell
docker pull osrm/osrm-backend
```

```powershell
docker run -t -v "/c/My Files/WORKSPACE/Self Taught/ReactNative:/data" osrm/osrm-backend osrm-extract -p /opt/car.lua /data/bangladesh-latest.osm.pbf docker run -t -i -p 5000:5000 -v "/c/My Files/WORKSPACE/Self Taught/ReactNative:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/bangladesh-latest.osrm
docker run -t -v "/c/My Files/WORKSPACE/Self Taught/ReactNative:/data" osrm/osrm-backend osrm-partition /data/bangladesh-latest.osrm
docker run -t -v "/c/My Files/WORKSPACE/Self Taught/ReactNative:/data" osrm/osrm-backend osrm-customize /data/bangladesh-latest.osrm
```

```powershell
docker run -t -i -p 5000:5000 -v "/c/My Files/WORKSPACE/Self Taught/ReactNative:/data" osrm/osrm-backend osrm-routed --algorithm mld /data/bangladesh-latest.osrm
```

## Lost Cost on Raspberry Pi

Get started with Raspberry Pi

```powershell
sudo apt update

sudo apt install -y nodejs npm
sudo npm install -g localtunnel
sudo NODE_TLS_REJECT_UNAUTHORIZED='0' lt --port 8080
#lt --port 8080

sudo apt install postgresql
sudo apt install postgis
sudo apt install osm2pgsql

pg_dump -U postgres -W -F t my_osm_db > my_osm_db.tar

sudo -i -u postgres pg_restore -d my_osm_db -F t < /home/pi/my_osm_db.tar

sudo apt install default-jdk
sudo apt install maven

curl -s https://pagekite.net/pk/ | sudo bash
sudo pagekite.py --signup
sudo pagekite.py <local_port> <your_pagekite_domain>
```
