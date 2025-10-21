#!/bin/bash

# Load environment variables
export OPENAI_API_KEY="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"
export GMAIL_EMAIL="alphabotsteam@gmail.com"
export GMAIL_APP_PASSWORD="Bn7548Jt!"
export EMAIL_FORWARD_TO="contact@alphabots.team"
export PLATFORM_EMAIL="Jonathan@Behrendterprises.com"
export SECRET_KEY="asdf#FGSgvasgf$5$WGT"

# Start the Flask application
cd /home/ubuntu/platformula-permanent
python3 src/main.py

