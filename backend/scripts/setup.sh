#!/bin/bash

set -e

echo "========== Duranta Initial Setup =========="

# Ask for sudo password once
sudo -v

# Paths
USER_NAME="$(whoami)"
HOME_DIR="$(eval echo "~$USER_NAME")"

OAI_ROOT="$HOME_DIR/duranta/openairinterface5g"
BUILD_DIR="$OAI_ROOT/cmake_targets"
BIN_DIR="$BUILD_DIR/ran_build/build"

SUDOERS_FILE="/etc/sudoers.d/duranta"

echo "Granting write access to Open5GS config..."

sudo chown "$USER_NAME:$USER_NAME" /etc/open5gs/amf.yaml
sudo chown "$USER_NAME:$USER_NAME" /etc/open5gs/smf.yaml
sudo chown "$USER_NAME:$USER_NAME" /etc/open5gs/upf.yaml

# Already configured?
if sudo test -f "$SUDOERS_FILE"; then
    echo "✔ Duranta sudo configuration already exists."

    sudo visudo -cf "$SUDOERS_FILE"

    exit 0
fi

echo "Creating sudoers configuration..."

sudo tee "$SUDOERS_FILE" >/dev/null <<EOF
# ==================================================
# Duranta Backend Passwordless Sudo Permissions
# ==================================================

# Package Management
$USER_NAME ALL=(ALL) NOPASSWD: /usr/bin/apt
$USER_NAME ALL=(ALL) NOPASSWD: /usr/bin/apt-get
$USER_NAME ALL=(ALL) NOPASSWD: /usr/bin/add-apt-repository

# Repository / Key Management
$USER_NAME ALL=(ALL) NOPASSWD: /usr/bin/gpg
$USER_NAME ALL=(ALL) NOPASSWD: /usr/bin/tee
$USER_NAME ALL=(ALL) NOPASSWD: /usr/bin/install
$USER_NAME ALL=(ALL) NOPASSWD: /usr/bin/mkdir

# OpenAirInterface Build
$USER_NAME ALL=(ALL) NOPASSWD: $BUILD_DIR/build_oai

# OAI Binaries
$USER_NAME ALL=(ALL) NOPASSWD: $BIN_DIR/nr-softmodem
$USER_NAME ALL=(ALL) NOPASSWD: $BIN_DIR/nr-uesoftmodem

# Service Management
$USER_NAME ALL=(ALL) NOPASSWD: /usr/bin/systemctl
EOF

echo "Setting permissions..."

sudo chmod 440 "$SUDOERS_FILE"

echo "Validating sudoers file..."

sudo visudo -cf "$SUDOERS_FILE"

echo
echo "=========================================="
echo "✅ Duranta sudo configuration complete."
echo "=========================================="