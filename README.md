# Duranta Open5GS GUI 📡

Welcome to the **Duranta Open5GS GUI**! 

This dashboard is a next-generation control panel designed to act as the visual frontend for the **Duranta OpenAirInterface5G (OAI)** codebase and the **Open5GS** core network. 

Instead of dealing with complex Linux terminal commands and manually editing `.conf` files, this UI provides a sleek, modern, dark-mode interface to manage, monitor, and configure a complete simulated 5G network (including the Core, the Base Station, and the User Equipment) right from your browser.

---

## 🌟 What is this project actually doing?

To run a private 5G network locally without expensive hardware, we use software simulators. A 5G network consists of three main pieces:
1. **The Core Network (AMF, UPF, etc.)**: We use Open5GS for this. It acts as the brain, handling internet routing and subscriber authentication.
2. **The Base Station / Tower (gNB)**: We use the `nr-softmodem` binary from the Duranta OAI codebase to simulate the cell tower broadcasting radio waves.
3. **The Mobile Phone (UE)**: We use the `nr-uesoftmodem` binary to simulate a 5G smartphone connecting to our tower.

This frontend acts as the **"Conductor"** for all three pieces. It allows you to configure how they talk to each other, start/stop the services, and visually monitor the highly complex 3GPP protocol messages (like RRC, NGAP, and NAS) flowing between them in real-time.

---

## 📸 Detailed Tour of the UI Features

### 1. The Dashboard (Network Overview)
![Dashboard View](./public/screenshots/dashboard-overview.png)

**What this UI part does:**
- **Live Topology Map**: This animated graph represents the actual connection state between your Open5GS AMF (Core), your Duranta gNB (Tower), and your Duranta UE (Phone). When the glowing particles are moving, it means the N2 (NGAP) and RRC control-plane connections are successfully established!
- **Network Status Panel (Sidebar)**: Quick indicators showing if the Core (`127.0.0.5`), the gNB (`NR-ARFCN`), and the UE (`IMSI:001`) processes are actually running on your Linux machine.
- **KPI Cards (Top)**: These display real-time network metrics extracted directly from the underlying C-binaries, such as signal quality (RSRP) and data throughput.

### 2. Live Logs (The "Under the Hood" View)
![Live Logs View](./public/screenshots/live-logs-main.png)

**Smart Log Filtering Features:**
*(These buttons allow you to instantly find the exact protocol messages you are looking for)*
<p align="center">
  <img src="./public/screenshots/log-filters-1.png" width="48%" />
  <img src="./public/screenshots/log-filters-2.png" width="48%" />
</p>

**What this UI part does:**
- **Real-Time Terminal Feed**: This window intercepts the raw standard output (stdout) from the `nr-softmodem` and `nr-uesoftmodem` processes. You are watching the actual C-code execute in real-time!
- **Protocol Filter Pills**: Instead of reading a chaotic wall of text, you can click the filter pills at the top to isolate specific 5G layers:
  - **`[NGAP]`**: Shows messages between the gNB and the AMF (e.g., `NGSetupRequest`).
  - **`[RRC]`**: Shows radio resource control messages between the Phone and the Tower (e.g., `RRCSetupComplete`).
  - **`[NAS]`**: Shows authentication and registration messages.
  - **Warnings/Errors**: Instantly isolates issues like `RSRP_DROP` or connection failures.

### 3. Configuration (Network Settings)
![Configuration View](./public/screenshots/network-configuration.png)

**What this UI part does:**
This page replaces the tedious process of manually using `vim` to edit the complex `.conf` files. 

- **Subscriber Credentials (SIM)**: When you edit the IMSI, Key (K), and OPc fields here, the UI updates the `uicc0` block inside your `ue.conf` file. These are the cryptographic keys that allow your simulated phone to authenticate with the Open5GS database.
- **PLMN & Core Parameters**: When you update the MCC, MNC, and AMF IP, the UI updates the `plmn_list` and `amf_ip_address` inside your `gnb.sa.band78.fr1.106PRB.pci0.rfsim.conf` file so the tower knows exactly where to find the Core network.
- **Apply & Restart Button**: Clicking this safely saves the configuration files to disk and restarts the underlying Linux processes so the network boots up with the new settings.

### 4. Advanced Modules: MDT (Minimization of Drive Tests)
**What this UI part does:**
Normally, network engineers have to physically drive around cities in cars to test 5G signal strength. The **MDT Module** visualizes a feature we added to the OAI RRC C-code that makes the phone do the work automatically!
- The phone (UE) constantly measures its signal strength (RSRP).
- If the signal drops below a threshold (e.g., `low_rsrp` or `rsrp_drop`), the phone saves it in a 64-slot ring buffer.
- The phone packages these samples into an ASN.1 `MeasurementReport` and sends it to the Tower.
- This UI module intercepts those reports from the Tower's memory and displays them in beautiful charts so you can see exactly where and why the signal dropped without leaving your desk!

---

## 🖼️ Full Application Gallery

<details>
<summary><b>Click to expand and view all screenshots</b></summary>
<br>

![Screenshot](./public/screenshots/gallery-01.png)
![Screenshot](./public/screenshots/gallery-02.png)
![Screenshot](./public/screenshots/gallery-03.png)
![Screenshot](./public/screenshots/gallery-04.png)
![Screenshot](./public/screenshots/gallery-05.png)
![Screenshot](./public/screenshots/gallery-06.png)
![Screenshot](./public/screenshots/gallery-07.png)
![Screenshot](./public/screenshots/gallery-08.png)
![Screenshot](./public/screenshots/gallery-09.png)
![Screenshot](./public/screenshots/gallery-10.png)
![Screenshot](./public/screenshots/gallery-11.png)
![Screenshot](./public/screenshots/gallery-12.png)

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
- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS for custom glassmorphism and dark-mode aesthetic
- **Typography**: "Plus Jakarta Sans" for UI, "JetBrains Mono" for terminal logs
- **Icons**: Lucide React
