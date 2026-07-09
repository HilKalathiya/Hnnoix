# Duranta Open5GS GUI 📡

Welcome to the **Duranta Open5GS GUI**! 

If you are new to 5G networking, don't worry! This dashboard is designed to make managing a complex 5G network as easy as using a modern web app. Behind the scenes, this application connects to **Open5GS** (a software-based 5G core network) and provides a beautiful, easy-to-understand visual interface so you don't have to rely entirely on complex command-line tools.

---

## 🌟 What does this app do? (For Non-Technical Users)

Imagine running your own private 5G cell tower network. To make it work, you need a "Core" (the brain of the network), a "gNB" (the radio antenna), and "UEs" (User Equipment, like smartphones). 

Usually, managing these pieces requires staring at endless walls of text in a terminal. **This application changes that.** It gives you a sleek, modern, dark-mode control panel where you can:
1. **See if your network is online** at a glance.
2. **Watch the activity** in real-time.
3. **Change settings** (like SIM card details) without editing confusing text files.

---

## 📸 Visual Tour of the Features

### 1. The Dashboard (Network Overview)
![Dashboard View](./public/screenshots/Screenshot%202026-07-09%20151655.png)

**What it does:**
- **Live Topology Map**: A visual map showing how the different pieces of your 5G network are connected. A glowing animation shows when data is successfully flowing between the Core, the Radio (gNB), and the Phones (UE).
- **Network Status**: Quick indicators (Online/Offline) so you instantly know if the network is healthy.
- **Real-Time Stats**: Displays metrics like signal quality, data speed (throughput), and delay (latency).

### 2. Live Logs (The "Under the Hood" View)
![Live Logs View](./public/screenshots/Screenshot%202026-07-09%20151701.png)

**What it does:**
- **Real-Time Feed**: Watches the system's brain process information in real-time. 
- **Smart Filtering**: Instead of a chaotic wall of text, the logs are color-coded. You can click on filters like "Warnings" or specific protocols (like `[NGAP]` or `[NAS]`) to only see the information you care about.
- **Downloadable**: See something wrong? You can pause the feed and click the download button to save the logs for troubleshooting.

### 3. Configuration (Network Settings)
![Configuration View](./public/screenshots/Screenshot%202026-07-09%20151708.png)

**What it does:**
- **SIM Card Management**: Manage the "Subscriber Credentials" (IMSI, Keys). This tells your network which smartphones are allowed to connect to your private 5G network.
- **Core Parameters**: Set up the country code and network codes (MCC/MNC).
- **Radio Parameters**: Configure the frequency your antenna broadcasts on (NR-ARFCN).
- **Safe Applying**: Changes are made in a beautiful form with "Copy" buttons and safe "Apply & Restart" functionality.

---

## 🖼️ Full Application Gallery
Here are all the detailed views and screens across the entire application:

<details>
<summary><b>Click to expand and view all screenshots</b></summary>
<br>

![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151716.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151720.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151726.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151731.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151736.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151741.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151746.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151750.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151755.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151759.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151804.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151809.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151814.png)
![Screenshot](./public/screenshots/Screenshot%202026-07-09%20151821.png)

</details>

---

## 💻 Setting up the Project on Another Device (Full Guide)

If you want to take this project and run it on a totally different computer, follow this exact step-by-step guide!

### Step 1: Install Node.js (Required)
Before doing anything, the new device needs Node.js installed to run the application.
1. Go to the official website: [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version for your operating system (Windows, Mac, or Linux).
3. Run the installer and click "Next" through all the default options. 
4. To verify it worked, open your terminal (Command Prompt / PowerShell / Terminal) and type `node -v`. It should print a version number (like `v18.x.x`).

### Step 2: Get the Code
You need to get the source code onto the new device.
- **If using Git**: 
  Open your terminal and run:
  `git clone <YOUR_GITHUB_REPO_URL>`
  *(Replace the URL with your actual GitHub repository link!)*
- **If using a ZIP file**:
  Download the code as a ZIP file from GitHub, and extract the folder somewhere on your computer.

### Step 3: Install the Project Dependencies
The project uses many UI libraries (like Tailwind CSS and React) that aren't included in the source code directly to save space. We need to download them.
1. Open your terminal.
2. Navigate into the project folder you just downloaded:
   ```bash
   cd path/to/Hnnoix
   ```
3. Run the install command:
   ```bash
   npm install
   ```
   *(This might take a minute or two as it downloads everything into a `node_modules` folder).*

### Step 4: Run the Application!
Now that everything is installed, it's time to start the dashboard!
1. In the same terminal, run:
   ```bash
   npm run dev
   ```
2. The terminal will print out a local web address. It usually looks like this:
   `➜  Local:   http://localhost:5173/`
3. Hold `Ctrl` (or `Cmd` on Mac) and click that link, OR copy and paste it into your web browser (Chrome/Edge/Safari).
4. **Congratulations! The Duranta Open5GS GUI is now running on the new device.**

---

## 🛠️ For Developers: Tech Stack
- **Framework**: React 18 with Vite for lightning-fast loading.
- **Styling**: Tailwind CSS for the custom dark-mode aesthetic.
- **Typography**: "Plus Jakarta Sans" for highly readable UI text, and "JetBrains Mono" for code and logs.
- **Icons**: Lucide React.
