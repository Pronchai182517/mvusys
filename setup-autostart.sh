#!/bin/bash
# Setup Systemd Autostart for mvusys Docker Containers on Reboot

PROJECT_DIR="/home/iamvj/workspace/antigravity-ide/projects/mvusys"
SERVICE_FILE="/etc/systemd/system/mvusys.service"

echo "⚙️ Setting up autostart for mvusys system..."

# Copy service file to systemd directory
sudo cp "$PROJECT_DIR/mvusys.service" "$SERVICE_FILE"
sudo chmod 644 "$SERVICE_FILE"

# Reload systemd and enable service
sudo systemctl daemon-reload
sudo systemctl enable mvusys.service

echo "✅ Auto-start on reboot configured successfully!"
echo "📌 You can check status anytime using: sudo systemctl status mvusys"
