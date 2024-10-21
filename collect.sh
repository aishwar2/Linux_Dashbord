#!/bin/bash

# Define servers
servers=("192.168.204.153" "192.168.204.152" "192.168.204.151") # replace with actual IPs
user="ubuntu" # replace with your username

# Initialize the data file
data_file="/var/www/html/data.csv"
echo "Server,CPU,RAM,Network" > $data_file

# Collect data
for server in "${servers[@]}"; do
  cpu=$(ssh $user@$server "top -bn1 | grep 'Cpu(s)' | awk '{print 100 - \$8}'")
  ram=$(ssh $user@$server "free -m | awk 'NR==2{printf \"%.2f\", \$3*100/\$2 }'")
  network=$(ssh $user@$server "ifstat -i ens33 1 1 | awk 'NR==3{print \$1}'") # replace ens33 with your network interface
  echo "$server,$cpu,$ram,$network" >> $data_file
done
