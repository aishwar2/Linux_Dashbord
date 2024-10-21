# Linux_Dashbord
Step 1: Collect Metrics Create a script that gathers CPU, RAM, storage, and network usage from the server.

Step 2: Set Up SSH Access Ensure password-less SSH access between your local machine and the server using SSH keys.

Step 3: Automate Data Collection Write a script that periodically fetches these metrics from the server via SSH and stores them locally.

Step 4: Create the HTML/CSS Dashboard Design a simple dashboard to display these metrics. It doesn't need to be fancy—just clean and functional.

Step 5: Serve the Dashboard Use a lightweight server to display the dashboard. Python’s http.server module works well for this purpose.

Step 6: Monitor and Enjoy Open yUsing bash, HTML, and CSS for your Linux server dashboard offers several advantages:

# Advantage 
Low Resource Usage:
Bash scripts are lightweight and efficient, minimizing resource consumption on your server.

Simplicity:
The setup is straightforward and easy to manage without needing complex software or dependencies.

Flexibility:
Bash, HTML, and CSS allow for quick adjustments and customizations tailored to your specific needs.

Security:
Using SSH for data collection ensures a secure connection between your local machine and server.

Accessibility:
With a basic web server like Python’s http.server, your dashboard can be accessed from any device with a web browser.

Cost-effective:
No need for additional software purchases or licenses, making it a budget-friendly solution.

Learning Opportunity:
Building and maintaining the dashboard enhances your scripting, web development, and server management skills.our browser to see the live-updating dashboard, giving you a real-time view of your server’s performance.

#Setup
### Step 1: Set Up SSH Access
Generate SSH Keys: Create an SSH key pair on your local machine.

ssh-keygen -t rsa -b 2048 -C "your_email@example.com"
Copy the Public Key to Your Server: This enables password-less SSH access.
ssh-copy-id your_username@your_server_ip

### Step 2: Write Bash Scripts
Create a Script to Collect Metrics:
CPU, RAM, Storage, and Network usage:
```#!/bin/bash
cpu=$(top -bn1 | grep "Cpu(s)" | awk '{print 100 - $8}')
ram=$(free -m | awk 'NR==2{printf "%.2f", $3*100/$2 }')
storage=$(df -h | awk '$NF=="/"{printf "%s", $5}')
network=$(ifstat -i ens33 1 1 | awk 'NR==3{print $1}')

echo "CPU: $cpu%" > metrics.txt
echo "RAM: $ram%" >> metrics.txt
echo "Storage: $storage" >> metrics.txt
echo "Network: $network KB/s" >> metrics.txt
Create a Script to Fetch Metrics:
```
```
#!/bin/bash
server="your_server_ip"
user="your_username"

ssh $user@$server 'bash -s' < collect_metrics.sh > metrics.txt
### Step 3: Automate Data Collection
Set Up a Loop to Fetch Metrics Regularly:
```
```
#!/bin/bash
while true; do
    /path/to/fetch_metrics.sh
    sleep 1
done
```
### Step 4: Design the Dashboard with HTML/CSS
Create the HTML File:
Design a simple dashboard to display the metrics.
Style with CSS:
Add basic styles for readability and layout.

### Step 5: Serve the Dashboard
Use Python’s HTTP Server:
Navigate to your project directory and start the server.
cd /path/to/dashboard
python3 -m http.server 8000
Visit http://localhost:8000 to see your real-time server dashboard.

This setup is lightweight and efficient, perfect for monitoring server resources without any heavy overhead. Time to get this rolling and keep a close watch on your server’s performance!
