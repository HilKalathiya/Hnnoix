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

> **Why are the images broken?** 
> If you are reading this on GitHub and the images below don't load, it's because the screenshots haven't been added to the folder yet! **You need to take screenshots of your app running, and save them in the `public/screenshots/` folder** as `dashboard.png`, `logs.png`, and `config.png`. Once you save them there and push to GitHub, they will magically appear below!

### 1. The Dashboard (Network Overview)
*(File needed: `public/screenshots/dashboard.png`)*

![Dashboard View](./public/screenshots/dashboard.png)

**What it does:**
- **Live Topology Map**: A visual map showing how the different pieces of your 5G network are connected. A glowing animation shows when data is successfully flowing between the Core, the Radio (gNB), and the Phones (UE).
- **Network Status**: Quick indicators (Online/Offline) so you instantly know if the network is healthy.
- **Real-Time Stats**: Displays metrics like signal quality, data speed (throughput), and delay (latency).

### 2. Live Logs (The "Under the Hood" View)
*(File needed: `public/screenshots/logs.png`)*

![Live Logs View](./public/screenshots/logs.png)

**What it does:**
- **Real-Time Feed**: Watches the system's brain process information in real-time. 
- **Smart Filtering**: Instead of a chaotic wall of text, the logs are color-coded. You can click on filters like "Warnings" or specific protocols (like `[NGAP]` or `[NAS]`) to only see the information you care about.
- **Downloadable**: See something wrong? You can pause the feed and click the download button to save the logs for troubleshooting.

### 3. Configuration (Network Settings)
*(File needed: `public/screenshots/config.png`)*

![Configuration View](./public/screenshots/config.png)

**What it does:**
- **SIM Card Management**: Manage the "Subscriber Credentials" (IMSI, Keys). This tells your network which smartphones are allowed to connect to your private 5G network.
- **Core Parameters**: Set up the country code and network codes (MCC/MNC).
- **Radio Parameters**: Configure the frequency your antenna broadcasts on (NR-ARFCN).
- **Safe Applying**: Changes are made in a beautiful form with "Copy" buttons and safe "Apply & Restart" functionality.

### 4. Advanced Modules (SON & MDT)
*These sections are placeholders for advanced network automation features:*
- **SON (Self-Organizing Network)**: Future features where the network will automatically fix its own signal issues.
- **MDT (Minimization of Drive Tests)**: Future telemetry gathering so engineers don't have to drive around in cars testing cell signals manually.

---

## 🚀 How to Run the Application

If you want to run this dashboard on your own computer, follow these simple steps:

### Prerequisites
You will need to have Node.js installed on your computer. If you don't have it, you can download it from [nodejs.org](https://nodejs.org/).

### Step-by-Step Instructions
1. **Open your Terminal (or Command Prompt)**
2. **Go to the project folder:**
   ```bash
   cd Hnnoix
   ```
3. **Install the required packages:** 
   *(This downloads all the UI libraries the app needs to look pretty)*
   ```bash
   npm install
   ```
4. **Start the application:**
   ```bash
   npm run dev
   ```
5. **View the app:** Open your web browser (like Chrome or Edge) and go to the link shown in your terminal (usually `http://localhost:5173`).

---

## 🛠️ For Developers: Tech Stack
- **Framework**: React 18 with Vite for lightning-fast loading.
- **Styling**: Tailwind CSS for the custom dark-mode aesthetic.
- **Typography**: "Plus Jakarta Sans" for highly readable UI text, and "JetBrains Mono" for code and logs.
- **Icons**: Lucide React.
