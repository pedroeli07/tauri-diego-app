# 🖨️ **DCubed 3D Printer Controller Developer** 🖨️
### 🚀 Empowering Your 3D Printing Journey 🚀 

[![Production Status](https://img.shields.io/badge/Production-up-green)](https://seu-link-aqui.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<div align="center">
  <img src="https://static.wixstatic.com/media/dd3eb8_2bf794cea3f44842924a75ceb59a253a~mv2.png/v1/fill/w_140,h_104,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.png" alt="DCubed"/>
</div>

---

**Welcome to the DCubed 3D Printer Controller Developer!**  
A modern and robust solution for **controlling** and **monitoring** DCubed's 3D printers via serial communication. Built with cutting-edge technologies, this application provides developers and technicians an efficient and user-friendly experience.  

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Target Users](#target-users)
4. [Tools and Technologies](#tools-and-technologies)
   - [Frontend](#frontend)
   - [Backend](#backend)
   - [Development Tools](#development-tools)
5. [Libraries and Dependencies](#libraries-and-dependencies)
   - [Frontend Libraries](#frontend-libraries)
   - [Backend Libraries](#backend-libraries)
6. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Steps](#steps)
7. [Usage](#usage)
   - [Connect to the 3D Printer](#1-connect-to-the-3d-printer)
   - [Control Hardware Components](#2-control-hardware-components)
   - [Logging and Exporting](#3-logging-and-exporting)
   - [Production Mode](#4-production-mode)
8. [Serial Communication Protocol](#serial-communication-protocol)
   - [Command Structure](#command-structure)
   - [Command Table](#command-table)
   - [Response Messages](#response-messages)
   - [C/C++ Integration Guide](#🛠️-cc-integration-guide)
9. [Codebase Structure](#codebase-structure)
   - [Frontend](#frontend-1)
   - [Backend](#backend-1)
10. [Rust Backend Documentation](#🦀-rust-backend-documentation)
11. [Contributing](#🤝-contributing)
12. [License](#📄-license)



---

## Project Overview

The **DCubed 3D Printer Controller Developer** application is engineered to offer real-time control and monitoring of DCubed's 3D printers. Leveraging serial communication, it allows users to manage various hardware components such as LEDs, motors, and light barriers through an intuitive graphical interface.

### Features

- **Real-Time Control**: Adjust motor speeds, LED intensities, and directions instantly.
- **Visual Feedback**: Immediate visual representation of adjustments for better user experience.
- **Comprehensive Logging**: Detailed logs for monitoring and debugging.
- **Export Logs**: Ability to export logs in CSV, PDF, or Excel formats.
- **Production Mode**: Seamlessly switch between development and production environments.
- **Responsive Design**: Optimized for various screen sizes and resolutions.

### Target Users

- **Developers**: For integrating and extending printer functionalities.
- **Technicians**: For maintaining and troubleshooting printer hardware.
- **3D Printing Enthusiasts**: For advanced control over printing processes.

---

## Tools and Technologies

### Frontend

- **Next.js**: A powerful React framework for building server-side rendered applications with excellent performance and SEO capabilities.
- **React**: A JavaScript library for building dynamic and interactive user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development with customizable design systems.
- **Framer Motion**: A production-ready motion library for React to create smooth animations and transitions.
- **ShadCN UI**: A collection of accessible and customizable UI components for React applications.
- **Lucide React**: A set of customizable and lightweight icons for React projects.

### Backend

- **Rust**: A systems programming language focused on safety, speed, and concurrency, ideal for performance-critical applications.
- **Tauri**: A framework for building tiny, fast binaries for all major desktop platforms using Rust, providing a secure and efficient backend for desktop applications.

### Development Tools

- **TypeScript**: Adds static typing to JavaScript, enhancing developer experience and code reliability.
- **ESLint**: A tool for identifying and fixing linting issues in JavaScript and TypeScript codebases.
- **PostCSS**: A tool for transforming CSS with JavaScript plugins, enabling advanced CSS features and optimizations.

---
## Libraries and Dependencies

### Frontend Libraries

- **@emotion/react**: ^11.14.0 - Library for writing CSS-in-JS.
- **@emotion/styled**: ^11.14.0 - Enables dynamic styling of components.
- **@hookform/resolvers**: ^3.9.1 - Validation resolver for `react-hook-form`.
- **@mui/material**: ^6.2.0 - Robust UI framework for React components.
- **@radix-ui/react-accordion**: ^1.2.2 - Accessible accordion component.
- **@radix-ui/react-alert-dialog**: ^1.1.3 - Accessible alert dialog.
- **@radix-ui/react-aspect-ratio**: ^1.1.1 - Maintain aspect ratios of components.
- **@radix-ui/react-avatar**: ^1.1.2 - Accessible and styled avatar component.
- **@radix-ui/react-checkbox**: ^1.1.3 - Accessible checkbox component.
- **@radix-ui/react-collapsible**: ^1.1.2 - Collapsible component.
- **@radix-ui/react-context-menu**: ^2.2.3 - Accessible context menu.
- **@radix-ui/react-dialog**: ^1.1.3 - Accessible modal dialog.
- **@radix-ui/react-dropdown-menu**: ^2.1.3 - Accessible dropdown menus.
- **@radix-ui/react-hover-card**: ^1.1.3 - Hoverable card for content previews.
- **@radix-ui/react-label**: ^2.1.1 - Accessible label component.
- **@radix-ui/react-menubar**: ^1.1.3 - Accessible menubar component.
- **@radix-ui/react-navigation-menu**: ^1.2.2 - Accessible navigation menus.
- **@radix-ui/react-popover**: ^1.1.3 - Accessible popover component.
- **@radix-ui/react-progress**: ^1.1.1 - Progress bar component.
- **@radix-ui/react-radio-group**: ^1.2.2 - Radio group component.
- **@radix-ui/react-scroll-area**: ^1.2.2 - Customizable scroll area.
- **@radix-ui/react-select**: ^2.1.3 - Accessible select component.
- **@radix-ui/react-separator**: ^1.1.1 - Separator component.
- **@radix-ui/react-slider**: ^1.2.2 - Slider input component.
- **@radix-ui/react-tabs**: ^1.1.2 - Tabs navigation component.
- **@radix-ui/react-toast**: ^1.2.3 - Toast notifications system.
- **@radix-ui/react-tooltip**: ^1.1.5 - Accessible tooltips.
- **cmdk**: 1.0.0 - Command palette for React.
- **embla-carousel-react**: ^8.5.1 - Lightweight carousel library.
- **framer-motion**: ^11.15.0 - Animation library for React.
- **input-otp**: ^1.4.1 - OTP input component.
- **lucide-react**: ^0.468.0 - Customizable icon library.
- **next**: ^13.4.0 - React framework for server-side rendering.
- **next-themes**: ^0.4.4 - Theme management for Next.js.
- **react**: ^18.2.0 - Main library for building UIs.
- **react-dom**: ^18.2.0 - React DOM rendering library.
- **react-day-picker**: 8.10.1 - Calendar component for React.
- **react-hook-form**: ^7.54.1 - Performant form handling library.
- **react-hot-toast**: ^2.4.1 - Lightweight toast notifications.
- **react-icons**: ^5.4.0 - Icon library for React.
- **react-resizable-panels**: ^2.1.7 - Resizable panels for layouts.
- **recharts**: ^2.15.0 - Composable charting library.
- **sonner**: ^1.7.1 - Alternative toast notification library.
- **tailwind-merge**: ^2.5.5 - Utility for merging Tailwind CSS classes.
- **tailwindcss**: ^3.3.2 - Utility-first CSS framework.
- **tailwindcss-animate**: ^1.0.7 - Tailwind CSS animations.
- **three**: ^0.170.0 - Library for 3D rendering with WebGL.
- **vaul**: ^1.1.2 - Accessible drawer component.
- **xlsx**: ^0.18.5 - Excel file reader and writer.
- **zod**: ^3.24.1 - Schema validation and type safety.

---

### Backend Libraries

- **serde**: 1.0 - Data serialization library.
- **serde_json**: 1.0 - JSON data manipulation.
- **tauri**: 1.4.1 - Framework for building desktop applications.
- **serialport**: Git (LukaOber/serialport-rs) - Serial communication library.
- **rfd**: 0.10 - Native file dialogs.
- **fs**: 0.0.5 - File system management.
- **chrono**: 0.4.28 - Date and time library.
- **log**: 0.4 - Logging library.
- **env_logger**: 0.10 - Environment-based logger configuration.

---

### Build and Configuration Tools

- **@tauri-apps/api**: ^1.5.1 - Tauri API for frontend-backend integration.
- **@tauri-apps/cli**: ^1.5.5 - CLI for building and managing Tauri apps.
- **typescript**: ^5.0.4 - JavaScript with static typing.
- **eslint**: ^8.39.0 - Code linting tool.
- **eslint-config-next**: ^13.4.0 - ESLint configuration for Next.js.
- **autoprefixer**: ^10.4.14 - CSS auto-prefixer.
- **postcss**: ^8.4.23 - CSS transformation tool.

---

### Development Tools

- **react-devtools**: React debugging and inspection tool.
- **cargo**: Rust package manager and build system.
- **tauri-plugin-window-state**: Save and restore window state.
- **tauri-plugin-autostart**: Enable app autostart with the system.
- **tauri-plugin-log**: Advanced logging for Tauri applications.

---

## Installation

### Prerequisites

- **Node.js** (v14 ou over)
- **npm** , **yarn** or **bun** ( bun install libraries much fastier )
- **Rust** (v1.60 ou over)
- **Tauri CLI**

### Installation Steps

# 1. Clone the Repository
```bash
git clone https://github.com/yourusername/dcubed-3d-printer-controller-developer.git
cd dcubed-3d-printer-controller-developer
```
# 2. Install Frontend Dependencies
 Using npm:
```bash
npm install
```
 Using yarn:
```bash
yarn install
```
 Using bun:
```bash
bun install
```
# 3. Build the Frontend
 Using npm:
```bash
npm run build
```
 Using yarn:
```bash
yarn build
```
 Using bun:
```bash
bun run build
```
# 4. Run the Application in Development Mode

 Using npm:
```bash
npm run tauri:build
```
 Using yarn:
```bash
yarn tauri:build
```
 Using bun:
```bash
bun tauri:build
```

4. **Run the Application in Development Mode**
```bash
npm run tauri:build
```
```bash
yarn tauri:build
```
```bash
bun tauri:build
```

---

## 🚀 Usage

### 1. **Connect to the 3D Printer**
   - Select the appropriate **serial port** and **baud rate** from the dropdown menus.
   - Click the **Connect** button to establish a connection with the 3D printer.

---

### 2. **Control Hardware Components**

- **🟢 LEDs**  
   - Toggle LEDs **ON/OFF** and adjust their intensity using sliders or input fields.  
   - Click the **Update** icon to confirm the changes.

- **⚙️ Motors**  
   - Start or stop motors, adjust their **speed**, and switch the **direction** between clockwise (CW) and counterclockwise (CCW).  
   - Use the **Update** icon to apply speed and direction changes.

- **💡 Light Barriers**  
   - Monitor the status of light barriers in real time with visual indicators on the interface.

---

### 3. **Logging and Exporting**

- View **real-time logs** in the **Debug Box**.  
- Export logs in your preferred format:
   - **CSV**  
   - **PDF**  
   - **Excel**  

   Use the **Export** buttons to download the logs.

---

### 4. **Production Mode**

- Switch between **Development Mode** and **Production Mode** using the **Production** button.  
- This mode optimizes performance for real-world use cases and hardware testing.

---

With these features, you can efficiently control, monitor, and debug your 3D printer hardware in both development and production environments. 🎯

---

## Serial Communication Protocol 

Effective communication between the **DCubed 3D Printer Controller Developer** application and the 3D printer's hardware is facilitated through a well-defined serial communication protocol. Understanding this protocol is crucial for developers aiming to integrate or extend functionalities, especially when interfacing directly with the printer's firmware.

### Command Structure

All commands sent from the application to the 3D printer's firmware adhere to a structured format to ensure consistency and reliability. Each command is a string composed of multiple parts, separated by the pipe (`|`) character, and terminated with a newline character (`\n`). This structure allows the firmware to parse and interpret commands accurately.

**General Format:**
COMMAND|ID|STATE|PARAMETER|VALUE\n

markdown
Copiar código

- **COMMAND**: Specifies the type of command (e.g., `LED`, `MOTOR`).
- **ID**: Identifies the specific hardware component (e.g., LED number, Motor number).
- **STATE**: Indicates the desired state (e.g., `ON`, `OFF`).
- **PARAMETER**: Specifies additional parameters (e.g., `INTENSITY`, `SPEED`, `DIR`).
- **VALUE**: The value associated with the parameter (e.g., percentage for intensity, Hz for speed).

### Command Table

The following table outlines the commands that the application sends to the 3D printer's firmware, along with their structure and descriptions.
<div align="center">

<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Command Sent</th>
      <th>Response Expected</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Turn LED On</strong></td>
      <td><code>LED|&lt;ID&gt;|ON|INTENSITY|&lt;VALUE&gt;\n</code></td>
      <td><code>ACK|LED|&lt;ID&gt;|ON|INTENSITY|&lt;VALUE&gt;\n</code></td>
      <td>Turns the specified LED on with a given intensity percentage.</td>
    </tr>
    <tr>
      <td><strong>Turn LED Off</strong></td>
      <td><code>LED|&lt;ID&gt;|OFF|INTENSITY|0\n</code></td>
      <td><code>ACK|LED|&lt;ID&gt;|OFF|INTENSITY|0\n</code></td>
      <td>Turns the specified LED off.</td>
    </tr>
    <tr>
      <td><strong>Set LED Intensity</strong></td>
      <td><code>LED|&lt;ID&gt;|ON|INTENSITY|&lt;VALUE&gt;\n</code></td>
      <td><code>LED|&lt;ID&gt;|ON|INTENSITY|&lt;VALUE&gt;\n</code></td>
      <td>Adjusts the LED intensity while keeping it on.</td>
    </tr>
    <tr>
      <td><strong>Turn Motor On</strong></td>
      <td><code>MOTOR|&lt;ID&gt;|ON|SPEED|&lt;VALUE&gt;|DIR|&lt;DIR&gt;\n</code></td>
      <td><code>ACK|MOTOR|&lt;ID&gt;|ON|SPEED|&lt;VALUE&gt;|DIR|&lt;DIR&gt;\n</code></td>
      <td>Turns the motor on with specified speed and direction.</td>
    </tr>
    <tr>
      <td><strong>Turn Motor Off</strong></td>
      <td><code>MOTOR|&lt;ID&gt;|OFF|SPEED|0|DIR|&lt;DIR&gt;\n</code></td>
      <td><code>ACK|MOTOR|&lt;ID&gt;|OFF|SPEED|0|DIR|&lt;DIR&gt;\n</code></td>
      <td>Turns the motor off.</td>
    </tr>
    <tr>
      <td><strong>Set Motor Speed</strong></td>
      <td><code>MOTOR|&lt;ID&gt;|ON|SPEED|&lt;VALUE&gt;|DIR|&lt;DIR&gt;\n</code></td>
      <td><code>MOTOR|&lt;ID&gt;|ON|SPEED|&lt;VALUE&gt;|DIR|&lt;DIR&gt;\n</code></td>
      <td>Sets the motor speed while keeping it on.</td>
    </tr>
    <tr>
      <td><strong>Set Motor Direction</strong></td>
      <td><code>MOTOR|&lt;ID&gt;|&lt;STATE&gt;|SPEED|&lt;VALUE&gt;|DIR|&lt;DIR&gt;\n</code></td>
      <td><code>ACK|MOTOR|&lt;ID&gt;|&lt;STATE&gt;|SPEED|&lt;VALUE&gt;|DIR|&lt;DIR&gt;\n</code></td>
      <td>Changes the motor direction.</td>
    </tr>
    <tr>
      <td><strong>Activate Production Mode</strong></td>
      <td><code>PRODUCTION_MODE\n</code></td>
      <td><code>ACK|PRODUCTION_MODE\n</code></td>
      <td>Switches the printer into production mode.</td>
    </tr>
    <tr>
      <td><strong>Send Reset Command</strong></td>
      <td><code>RESET\n</code></td>
      <td><code>ACK|RESET\n</code></td>
      <td>Resets the printer to restart operations.</td>
    </tr>
    <tr>
      <td><strong>Start Recording Serial Data</strong></td>
      <td><code>RECORD_SERIAL\n</code></td>
      <td><code>ACK|RECORD_SERIAL\n</code></td>
      <td>Starts recording incoming serial data.</td>
    </tr>
    <tr>
      <td><strong>Stop Recording Serial Data</strong></td>
      <td><code>STOP_RECORD_SERIAL\n</code></td>
      <td><code>ACK|STOP_RECORD_SERIAL\n</code></td>
      <td>Stops recording incoming serial data.</td>
    </tr>
    <tr>
      <td><strong>Light Barrier Status</strong></td>
      <td><code>LIGHT_BARRIER|&lt;ID&gt;|&lt;STATUS&gt;\n</code></td>
      <td><code>ACK|LIGHT_BARRIER|&lt;ID&gt;|&lt;STATUS&gt;\n</code></td>
      <td>Reports the status of the light barrier (`OK` or `ERROR`).</td>
    </tr>
    <tr>
      <td><strong>Error Message</strong></td>
      <td>N/A</td>
      <td><code>ERROR|&lt;DESCRIPTION&gt;\n</code></td>
      <td>Provides details about encountered errors.</td>
    </tr>
  </tbody>
</table>

</div>

  
Response Messages

The firmware responds to commands and events with structured messages, formatted as follows:

<div align="center">

<table>
  <thead>
    <tr>
      <th>Message Type</th>
      <th>Response</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Acknowledgment</strong></td>
      <td><code>ACK|&lt;COMMAND&gt;\n</code></td>
      <td>Confirms receipt and processing of a command.</td>
    </tr>
    <tr>
      <td><strong>LED Update</strong></td>
      <td><code>LED|&lt;ID&gt;|&lt;STATE&gt;|INTENSITY|&lt;VALUE&gt;\n</code></td>
      <td>Reports the LED's state and intensity.</td>
    </tr>
    <tr>
      <td><strong>Motor Update</strong></td>
      <td><code>MOTOR|&lt;ID&gt;|&lt;STATE&gt;|SPEED|&lt;VALUE&gt;|DIR|&lt;DIR&gt;\n</code></td>
      <td>Reports the motor's state, speed, and direction.</td>
    </tr>
    <tr>
      <td><strong>Light Barrier Update</strong></td>
      <td><code>LIGHT_BARRIER|&lt;ID&gt;|&lt;STATUS&gt;\n</code></td>
      <td>Reports the status of the light barrier (`OK` or `ERROR`).</td>
    </tr>
    <tr>
      <td><strong>Error Message</strong></td>
      <td><code>ERROR|&lt;DESCRIPTION&gt;\n</code></td>
      <td>Provides details about encountered errors.</td>
    </tr>
    <tr>
      <td><strong>Unknown Message</strong></td>
      <td><code>UNKNOWN|&lt;RAW_MESSAGE&gt;\n</code></td>
      <td>Indicates an unrecognized message format.</td>
    </tr>
  </tbody>
</table>

</div>

  
<ID>: Hardware component identifier (e.g., LED or Motor number).
<VALUE>: Parameter value (e.g., intensity percentage, speed in Hz).
<DIR>: Motor direction (CW for clockwise, CCW for counter-clockwise).
  

---
## 🛠️ C/C++ Integration Guide

For developers working on the 3D printer firmware in **C** or **C++**, understanding the serial communication protocol is essential. The following guidelines provide instructions on parsing incoming commands and formatting responses appropriately.

---

### 🔄 Parsing Incoming Commands

1. **📥 Read Incoming Data**
   - Continuously read data from the serial port.  
   - Store received bytes until a **newline character** (`\n`) is detected, indicating the end of a command.

2. **✂️ Tokenize the Command**
   - Split the command string using the **pipe** (`|`) delimiter.  
   - **Example:** `LED|3|ON|INTENSITY|75\n` splits into `["LED", "3", "ON", "INTENSITY", "75"]`.

3. **🔍 Identify Command Type**
   - The **first token** determines the command type (e.g., `LED`, `MOTOR`, `RESET`).

4. **🔑 Extract Parameters**
   - Based on the command type, extract the relevant parameters:

   - **LED Command**  
     - `ID`: Integer representing the LED number.  
     - `STATE`: `"ON"` or `"OFF"`.  
     - `INTENSITY`: Integer between `0` and `100`.  

   - **Motor Command**  
     - `ID`: Integer representing the motor number.  
     - `STATE`: `"ON"` or `"OFF"`.  
     - `SPEED`: Integer representing the speed in Hz.  
     - `DIR`: `"CW"` (clockwise) or `"CCW"` (counterclockwise).  

   - **General Commands**  
     - Commands like `PRODUCTION_MODE` or `RESET` may not require additional parameters.

5. **⚙️ Execute Actions**
   - Execute hardware actions based on the extracted parameters.  
   - **Example:** For `LED|3|ON|INTENSITY|75`, turn on LED number 3 and set its intensity to 75%.

6. **✅ Send Acknowledgment**
   - After successfully processing a command, send an acknowledgment back.  
   - **Example:** `ACK|LED\n`.

---

### 📤 Formatting and Sending Responses

1. **🔧 Structured Response**
   - Ensure all responses follow a **predefined format** for consistency.  
   - Include relevant details to inform the application about the current state or any issues.

2. **💡 Example Responses**
   - **LED Update:** `LED|3|ON|INTENSITY|75\n`  
   - **Motor Update:** `MOTOR|2|OFF|SPEED|0|DIR|CCW\n`  
   - **Light Barrier Status:** `LIGHT_BARRIER|1|OK\n`  
   - **Error Message:** `ERROR|Invalid LED ID\n`  

3. **⚠️ Error Handling**
   - For invalid commands or parameters, send an error message.  
   - **Example:** `ERROR|Unknown Command\n`.

4. **🔄 Consistency**
   - Always **end messages with a newline** (`\n`) to signal the end of the response.  
   - Use **uppercase letters** for command and parameter identifiers to avoid case sensitivity issues.

---

### 📝 Sample C++ Code Snippet for Parsing Commands
## Arduino Code for Command Processing

```cpp
The following Arduino code demonstrates how to process serial commands, control LEDs and motors, and monitor light barriers. Each function is explained with inline comments to make it easy to understand and adapt.

```cpp
// Function to process received commands via serial
void processCommand(String command) {
  // Split the string into parts using '|' as a delimiter
  int partIndex = 0;
  String parts[10];
  int pos = 0;

  while ((pos = command.indexOf('|')) != -1) {
    parts[partIndex++] = command.substring(0, pos);
    command = command.substring(pos + 1);
  }
  parts[partIndex] = command;

  // Check the command type and delegate to appropriate handler
  if (parts[0] == "LED") {
    int id = parts[1].toInt();         // Extract LED ID
    String state = parts[2];           // Extract LED state (ON/OFF)
    int intensity = parts[4].toInt();  // Extract intensity value
    handleLED(id, state, intensity);
  } else if (parts[0] == "MOTOR") {
    int id = parts[1].toInt();         // Extract Motor ID
    String state = parts[2];           // Extract Motor state (ON/OFF)
    int speed = parts[4].toInt();      // Extract speed value
    String direction = parts[6];       // Extract direction (CW/CCW)
    handleMotor(id, state, speed, direction);
  } else if (parts[0] == "LIGHT_BARRIER") {
    int id = parts[1].toInt();         // Extract Light Barrier ID
    String status = parts[2];          // Extract Light Barrier status (OK/ERROR)
    handleLightBarrier(id, status);
  } else {
    sendError("Unknown command");      // Handle unknown commands
  }
}

// Function to control LEDs
void handleLED(int id, String state, int intensity) {
  if (state == "ON") {
    // Map intensity (0-100%) to PWM range (0-255)
    analogWrite(LED_PIN, map(intensity, 0, 100, 0, 255));
    sendACK("LED", id, "ON");          // Send acknowledgment
  } else if (state == "OFF") {
    analogWrite(LED_PIN, 0);           // Turn off the LED
    sendACK("LED", id, "OFF");         // Send acknowledgment
  } else {
    sendError("Invalid LED state");    // Send error for invalid state
  }
}

// Function to control motors
void handleMotor(int id, String state, int speed, String direction) {
  if (state == "ON") {
    // Map speed (0-5000 Hz) to PWM range (0-255)
    analogWrite(MOTOR_PIN, map(speed, 0, 5000, 0, 255)); // Adjust mapping as needed
    sendACK("MOTOR", id, "ON");         // Send acknowledgment
  } else if (state == "OFF") {
    analogWrite(MOTOR_PIN, 0);          // Turn off the motor
    sendACK("MOTOR", id, "OFF");        // Send acknowledgment
  } else {
    sendError("Invalid Motor state");   // Send error for invalid state
  }
}

// Function to monitor light barrier status
void handleLightBarrier(int id, String status) {
  if (status == "OK" || status == "ERROR") {
    sendACK("LIGHT_BARRIER", id, status); // Send acknowledgment with status
  } else {
    sendError("Invalid Light Barrier status"); // Send error for invalid status
  }
}

// Function to send acknowledgment (ACK) messages
void sendACK(String device, int id, String status) {
  Serial.print("ACK|");                 // Start ACK message
  Serial.print(device);                 // Include device type (LED/MOTOR/LIGHT_BARRIER)
  Serial.print("|");
  Serial.print(id);                     // Include device ID
  Serial.print("|");
  Serial.println(status);               // Include status (ON/OFF/OK/ERROR)
}

// Function to send error messages
void sendError(String description) {
  Serial.print("ERROR|");               // Start error message
  Serial.println(description);          // Include error description
}

```

## 📝 Explanation
The sample C++ code demonstrates how to parse received serial commands, execute corresponding actions, and send acknowledgments or error messages back to the application.

The functions handleLEDCommand and handleMotorCommand parse specific parameters and perform actions based on the command's content.
The function sendError communicates any issues encountered during command processing.

---
<!-- Frontend Section -->
<h3 align="center">🎨 Frontend</h3>
<table align="center" width="100%">
  <thead>
    <tr>
      <th align="left">Path</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>src/pages/index.tsx</code></td>
      <td>Main frontend entry point with UI components, state logic, and interaction handlers. Integrates sliders, buttons, and log displays.</td>
    </tr>
    <tr>
      <td><code>src/utils/commands.ts</code></td>
      <td>Utility functions for formatting and sending serial commands, such as <code>handleLEDCommand</code> and <code>handleMotorCommand</code>.</td>
    </tr>
    <tr>
      <td><code>src/utils/serial.ts</code></td>
      <td>Handles serial communication: listener setup, response parsing, and synchronization of hardware state with the frontend.</td>
    </tr>
    <tr>
      <td><code>src/utils/window.ts</code></td>
      <td>Window control utilities using the <strong>Tauri</strong> API. Includes functions like <code>closeApp</code>, <code>minimizeApp</code>, and <code>maximizeApp</code>.</td>
    </tr>
    <tr>
      <td><code>src/components/</code></td>
      <td>Reusable UI components such as <code>Toast</code>, <code>CustomTooltip</code>, <code>MotorIcon</code>, <code>LightBarrierIcon</code>, and <code>LEDIcon</code>.</td>
    </tr>
    <tr>
      <td><code>src/lib/</code></td>
      <td>TypeScript type definitions and general utility functions to support data management and functionality.</td>
    </tr>
  </tbody>
</table>

<!-- Backend Section -->
<h3 align="center">🦀 Backend</h3>
<table align="center" width="100%">
  <thead>
    <tr>
      <th align="left">Path</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>backend/src/main.rs</code></td>
      <td>Core backend logic in <strong>Rust</strong> integrated with <strong>Tauri</strong>. Manages serial port connections and data exchange with the frontend.</td>
    </tr>
    <tr>
      <td><code>backend/src/serial_wrapper.rs</code></td>
      <td>Handles serial management: initialization, asynchronous reading via threads, and error handling.</td>
    </tr>
    <tr>
      <td><code>Cargo.toml</code></td>
      <td>Configuration and dependency management for the <strong>Rust</strong> project.</td>
    </tr>
  </tbody>
</table>

<!-- Directory Tree -->
<h3 align="center">🗂 Directory Overview</h3>
<pre>
dcubed-3d-printer-controller-developer/
├── src/
│   ├── pages/
│   │   └── index.tsx            # Main frontend page
│   ├── utils/
│   │   ├── commands.ts          # Serial command utilities
│   │   ├── serial.ts            # Serial communication utilities
│   │   └── window.ts            # Window management for Tauri
│   ├── components/
│   │   ├── Toast.tsx            # Notification Toast
│   │   ├── CustomTooltip.tsx    # Custom Tooltip
│   │   ├── MotorIcon.tsx        # Motor visuals
│   │   ├── LightBarrierIcon.tsx # Light Barrier visuals
│   │   ├── LEDIcon.tsx          # LED visuals
│   │   └── ...
│   ├── lib/
│   │   ├── types.ts             # Type definitions
│   │   └── utils.ts             # General utilities
│   └── ...
├── backend/
│   ├── src/
│   │   ├── main.rs              # Core backend logic
│   │   ├── serial_wrapper.rs    # Serial port management
│   └── Cargo.toml               # Rust dependencies
├── public/                      # Static assets
├── tauri.conf.json              # Tauri configuration
├── package.json                 # Frontend configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md                    # Project documentation
</pre>


---

---
### 📂 **Frontend**

#### 🗂️ **Directory Structure**

<div style="overflow-x: auto;">

| **Path**                      | **Description**                                                                                                                                      |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`src/pages/index.tsx`**     | Serves as the main entry point for the frontend. It houses the primary UI components, state management logic, and interaction handlers. This file integrates various components like buttons, sliders, and log displays to provide a cohesive user interface. |
| **`src/utils/commands.ts`**   | Contains utility functions responsible for formatting and sending serial commands to the backend. Functions like `handleLEDCommand` and `handleMotorCommand` structure commands according to the defined protocol and ensure they are sent correctly. |
| **`src/utils/serial.ts`**     | Manages serial communication, including setting up listeners for incoming data, parsing responses, and handling connection states. It ensures that the frontend remains synchronized with the hardware's state. |
| **`src/utils/window.ts`**     | Provides utilities for managing the application window using Tauri's API. Functions like `closeApp`, `minimizeApp`, and `maximizeApp` allow for window control actions triggered from the frontend. |
| **`src/components/`**         | Houses reusable UI components such as `Toast`, `CustomTooltip`, `MotorIcon`, `LightBarrierIcon`, and `LEDIcon`. These components encapsulate specific functionalities and styles, promoting consistency and reusability across the application. |
| **`src/lib/`**                | Contains TypeScript type definitions and general utility functions that support the frontend's functionality and data management.                           |

</div>

---

### 🖥️ **Backend**

#### 🗂️ **Directory Structure**

<div style="overflow-x: auto;">

| **Path**                       | **Description**                                                                                                                                      |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`backend/src/main.rs`**      | Acts as the core of the Rust backend, integrating with Tauri to expose commands and manage serial communication. It defines commands that the frontend can invoke, handles serial port connections, and manages data exchange between the application and the 3D printer. |
| **`backend/src/serial_wrapper.rs`** | Implements serial port management, including initializing connections, reading incoming data in separate threads, and handling errors. It ensures that serial communication is handled efficiently and safely. |
| **`Cargo.toml`**               | Specifies the Rust project's dependencies, configurations, and metadata, ensuring that all necessary libraries are included and managed correctly.       |

</div>
---

### 🦀 **Rust Backend Documentation**

#### 📚 **Overview**

The Rust backend is a critical component of the **DCubed 3D Printer Controller Developer** application, responsible for handling serial communication with the 3D printer hardware. Built using Rust and Tauri, it ensures high performance, safety, and seamless integration with the frontend built in React. This backend manages tasks such as connecting to serial ports, reading and writing data, and handling recordings of serial communication.

#### ❓ **Why Rust and Tauri?**

- **🦀 Rust**
  - **Performance:**  
    Rust is renowned for its speed and efficiency, making it ideal for performance-critical applications like real-time hardware communication.
  - **Safety:**  
    Rust's ownership model guarantees memory safety without needing a garbage collector, reducing the risk of common bugs.
  - **Concurrency:**  
    Rust provides powerful concurrency primitives, enabling safe and efficient multi-threaded operations.

- **🔧 Tauri**
  - **Lightweight:**  
    Tauri applications are significantly smaller in size compared to traditional Electron apps, leading to faster downloads and lower memory usage.
  - **Security:**  
    Tauri emphasizes security by default, providing a secure bridge between the frontend and backend.
  - **Cross-Platform:**  
    Build applications for all major desktop platforms (Windows, macOS, Linux) with a single codebase.
  - **Rust Integration:**  
    Leverage Rust's capabilities directly within your desktop applications, ensuring high performance and safety.

#### 🔑 **Key Components**

- **📡 Serial Communication**
  - **Listing Ports:**  
    Enumerates available serial ports to allow users to select the appropriate one for communication.
  - **Connecting/Disconnecting:**  
    Manages the lifecycle of serial port connections, ensuring threads are safely started and stopped.
  - **Reading Data:**  
    Continuously reads data from the serial port in a separate thread, emitting events to the frontend for real-time updates.
  - **Writing Data:**  
    Provides functionality to send commands to the connected serial device, enabling control over hardware components.

- **🎥 Recording Functionality**
  - **Start Recording:**  
    Initiates recording of serial data, saving it to timestamped log files for later analysis.
  - **Stop Recording:**  
    Safely stops the recording process, ensuring all data is flushed and files are properly closed.
  - **File Management:**  
    Automatically rotates log files every 10 minutes to prevent single large files and facilitate easier data handling.

- **⚠️ Error Handling**
  - **User Notifications:**  
    Utilizes native dialog boxes to inform users of errors, such as failed port connections or file creation issues.
  - **Thread Management:**  
    Ensures that serial reading threads are gracefully terminated in case of errors or when the application state changes.

#### 🔍 **Understanding Serial Communication**

- **📟 What is a Serial Port?**  
  A serial port is a physical or virtual interface through which data is transmitted one bit at a time, sequentially, over a communication channel or computer bus. In the context of the **DCubed 3D Printer Controller Developer** application, serial ports are used to communicate with the 3D printer's hardware components.

- **📖 Key Terms**
  - **Baud Rate:**  
    The speed at which data is transmitted over the serial port, measured in bits per second (bps). Common baud rates include 9600, 19200, 38400, etc.
  - **Line Ending (Ending):**  
    The characters appended to the end of each command sent over the serial port, typically carriage return (`\r`), newline (`\n`), or both (`\r\n`).

#### 🔧 **How the Backend Handles Serial Communication**

- **Setting Port Configuration:**  
  Users configure the serial port path, baud rate, and line ending via the frontend. These configurations are sent to the backend using the `set_port_items` command.
  
    ```rust
    #[tauri::command]
    fn set_port_items(state: State<AppData>, port: &str, baud: &str, ending: &str){
        // Acquire the lock on the state.
        let mut state_guard = state.0.lock().unwrap();
        
        // Update the port items with new values.
        state_guard.port_items = PortItems {
            port_path: port.to_string(),
            baud_rate: baud.to_string().parse::<u32>().unwrap(), // Parse baud rate from string to u32.
            ending: ending.to_string()
        };
    }
    ```

- **Initializing the Serial Port:**  
  The backend uses the `init_port` function to open the serial port with the specified path and baud rate.
  
    ```rust
    let port = serial_wrapper::init_port(state_guard.port_items.port_path.to_string(), state_guard.port_items.baud_rate);
    ```

- **Sending Commands:**  
  When sending commands, the backend appends the configured line ending to ensure proper command termination.
  
    ```rust
    let input_format = format!("{}{}", input, state_guard.port_items.ending);
    ```

- **Error Handling:**  
  The backend gracefully handles errors related to serial communication, such as failed connections or write operations, by notifying the user through dialog boxes.

#### 📖 **Getting Started**

##### 🔧 **Setting Up the Backend**

1. **Ensure Prerequisites Are Met**
   - **Rust:** Install Rust from [rust-lang.org](https://www.rust-lang.org/).
   - **Tauri CLI:** Install Tauri's command-line interface by following [Tauri's installation guide](https://tauri.app/v1/guides/getting-started/prerequisites).

2. **Navigate to the Backend Directory**
    ```bash
    cd dcubed-3d-printer-controller-developer/backend
    ```

3. **Build the Backend**
    ```bash
    cargo build
    ```

4. **Run the Backend in Development Mode**
    ```bash
    cargo run
    ```

##### 🔗 **Integrating with the Frontend**

The backend is seamlessly integrated with the React frontend through Tauri's API. Commands defined in `main.rs` are accessible from the frontend, enabling actions like connecting to serial ports, sending commands, and managing recordings.

---

### 📜 **Sample Code Snippets**


#### 🔄 **Connecting to a Serial Port**

The `handle_serial_connect` command manages connecting to or disconnecting from the serial port based on the current state.

- **Connecting:** Initializes the serial port with the specified configuration and starts a thread to read incoming data.
- **Disconnecting:** Signals the reading thread to stop and safely closes the serial port.

```rust
#[tauri::command]
fn handle_serial_connect(app: tauri::AppHandle) -> bool {
    // Clone the app handle for use in the thread.
    let app_clone = app.clone();
    
    // Retrieve the application state.
    let state = app_clone.state::<AppData>();
    
    // Acquire the lock on the state.
    let mut state_guard = state.0.lock().unwrap();

    // Check if the application is currently recording.
    if state_guard.is_recording {
        // Display an error message if recording is active.
        rfd::MessageDialog::new()
            .set_level(rfd::MessageLevel::Error)
            .set_title("Port Error")
            .set_description("Please stop recording before disconnecting")
            .set_buttons(rfd::MessageButtons::Ok)
            .show();
        return true;
    }

    // Check if a serial port is already connected.
    match &state_guard.port {
        Some(_) => {
            println!("Killing thread"); // Log the action.
            // Signal the thread to stop by setting the flag to false.
            state_guard.is_thread_open.store(false, Ordering::Relaxed);
            // Wait for the thread to acknowledge the stop signal.
            while !state_guard.is_thread_open.load(Ordering::Relaxed) {}
            // Remove the serial port from the state.
            state_guard.port = None;
            return false; // Indicate that the port has been disconnected.
        }
        None => {
            // Initialize the serial port using the provided configuration.
            let port = serial_wrapper::init_port(state_guard.port_items.port_path.to_string(), state_guard.port_items.baud_rate);
            // Check if the port was successfully opened.
            match port {
                Ok(port) => {
                    // Clone the port for thread usage.
                    let port_clone = port.try_clone().expect("Couldn't clone port");
                    // Store the port in the application state.
                    state_guard.port = Some(port);
                    // Clone the thread open flag for thread communication.
                    let is_thread_open_ref = state_guard.is_thread_open.clone();
                    // Start the serial reading thread.
                    serial_wrapper::start_clone_thread(app.clone(), port_clone, is_thread_open_ref);
                }
                Err(e) => {
                    // Format the error message.
                    let error_description = format!("{}{}", "An error occurred opening port: ", e);
                    // Display the error message to the user.
                    rfd::MessageDialog::new()
                        .set_level(rfd::MessageLevel::Error)
                        .set_title("Port Error")
                        .set_description(error_description.as_str())
                        .set_buttons(rfd::MessageButtons::Ok)
                        .show();

                    return false; // Indicate that the port connection failed.
                }
            }
        }
    }
    return true; // Indicate that the port connection was successful.
}
```

Reading Data from the Serial Port
The backend continuously reads data from the serial port in a separate thread. Incoming data is emitted to the frontend for real-time updates.


```rust
pub fn start_clone_thread(
    app: tauri::AppHandle, // Handle to the Tauri application.
    mut port_clone: Box<dyn SerialPort>, // Clone of the serial port to be used in the thread.
    is_thread_open: Arc<AtomicBool>, // Shared flag to control the thread's execution.
) {
    // Buffer to store incoming serial data.
    let mut serial_buf: Vec<u8> = vec![0; 32];

    // Spawn a new thread for reading serial data.
    thread::spawn(move || {
        is_thread_open.store(true, Ordering::Relaxed); // Indicate that the thread is running.
        println!("Thread spawned"); // Log the thread start.
        while is_thread_open.load(Ordering::Relaxed) { // Loop while the thread is active.
            match port_clone.read(serial_buf.as_mut_slice()) { // Attempt to read from the serial port.
                Ok(size) => {
                    // Convert the read bytes to a UTF-8 string.
                    let data_str = String::from_utf8_lossy(&serial_buf[..size]).to_string();
                    println!("Received: {}", data_str); // Log the received data.
                    // Emit the received data to the frontend via Tauri events.
                    app.emit_all("updateSerial", Payload { message: data_str }).unwrap();
                }
                Err(ref e) if e.kind() == io::ErrorKind::TimedOut => (), // Ignore timeout errors.
                Err(_) => {
                    // On other errors, perform cleanup.
                    let app_clone = app.clone(); // Clone the app handle.
                    use crate::AppData; // Import AppData from the main module.
                    let state = app_clone.state::<AppData>(); // Retrieve the application state.
                    let mut state_guard = state.0.lock().unwrap(); // Acquire the lock on the state.
                    // Clone the port path and baud rate for logging or further actions.
                    let _port_path = state_guard.port_items.port_path.clone();
                    let _baud_rate = state_guard.port_items.baud_rate.clone();
                    
                    // Remove the serial port from the state.
                    state_guard.port = None;

                    // Reset the recording flag.
                    state_guard.is_recording = false;
                    // Indicate that the thread is no longer open.
                    is_thread_open.store(false, Ordering::Relaxed);
                    // Emit a disconnected event to the frontend.
                    app.emit_all("isConnected", Payload {message: "disconnected".to_string()}).unwrap();
                }
            }
        }
        println!("Terminating no record thread and now enabling..."); // Log the thread termination.
        is_thread_open.store(true, Ordering::Relaxed); // Reset the thread flag.
    });
}
```
Writing Data to the Serial Port
The send_serial command allows the frontend to send custom commands to the connected serial device. It appends the configured line ending to the input before sending.

```rust
#[tauri::command]
fn send_serial(state: State<AppData>, input: String) {
    let mut state_guard = state.0.lock().unwrap(); // Acquire the lock on the state.
    // Format the input with the configured line ending.
    let input_format = format!("{}{}", input, state_guard.port_items.ending);
    match &mut state_guard.port {
        Some(port) => {
            // Attempt to write the formatted input to the serial port.
            let write = serial_wrapper::write_serial(port, input_format.as_str());
            match write {
                Ok(s) => {
                    println!("Write {} bytes success", s); // Log successful write.
                }
                Err(e) => {
                    // If writing fails, format the error message.
                    let error_description =
                        format!("{}{}", "An error occurred writing to port: ", e);
                    // Display the error message to the user.
                    rfd::MessageDialog::new()
                        .set_level(rfd::MessageLevel::Error) // Set the message level to error.
                        .set_title("Write Error") // Set the dialog title.
                        .set_description(error_description.as_str()) // Set the dialog description.
                        .set_buttons(rfd::MessageButtons::Ok) // Use Ok button.
                        .show();
                }
            }
        }
        None => {
            // If no serial port is connected, display an error message.
            rfd::MessageDialog::new()
                .set_level(rfd::MessageLevel::Error) // Set the message level to error.
                .set_title("Port Error") // Set the dialog title.
                .set_description("Connect to port first.") // Set the dialog description.
                .set_buttons(rfd::MessageButtons::Ok) // Use Ok button.
                .show();
        }
    }
}
```

⚙️ Understanding Serial Communication Parameters
<p> <strong>🔹 Baud Rate:</strong> </p> <ul> <li><strong>Definition:</strong> The baud rate is the speed at which data is transmitted over the serial port, measured in bits per second (bps).</li> <li><strong>Common Values:</strong> <code>9600</code>, <code>19200</code>, <code>38400</code>, <code>57600</code>, <code>115200</code>.</li> <li><strong>Impact:</strong> A higher baud rate allows for faster data transmission but may require better signal quality and more precise timing.</li> </ul> <p> <strong>🔹 Line Ending (Ending):</strong> </p> <ul> <li><strong>Definition:</strong> Line endings are characters appended to the end of each command sent over the serial port.</li> <li><strong>Common Values:</strong> Carriage Return (<code>\r</code>), Newline (<code>\n</code>), or both (<code>\r\n</code>).</li> <li><strong>Impact:</strong> Ensures that the receiving device correctly interprets the end of each command. Mismatched line endings can lead to communication errors.</li> </ul>
🛠 How These Parameters Are Handled in the Rust Backend
<p> <strong>🔧 Setting Port Configuration:</strong> </p> <p> Users configure the serial port path, baud rate, and line ending via the frontend. These configurations are sent to the backend using the <code>set_port_items</code> command. </p>

<p> <strong>🔧 Initializing the Serial Port:</strong> </p> <p> The backend uses the <code>init_port</code> function to open the serial port with the specified path and baud rate. </p>

```rust

let port = serial_wrapper::init_port(state_guard.port_items.port_path.to_string(), state_guard.port_items.baud_rate);
Sending Commands
When sending commands, the backend appends the configured line ending to ensure proper command termination.
```

```rust
let input_format = format!("{}{}", input, state_guard.port_items.ending);
```


### Arduino Code for Command Processing

The following Arduino code demonstrates how to process serial commands, control LEDs and motors, and monitor light barriers. Each function is explained with inline comments to make it easy to understand and adapt.

```cpp
// Function to process received commands via serial
void processCommand(String command) {
  // Split the string into parts using '|' as a delimiter
  int partIndex = 0;
  String parts[10];
  int pos = 0;

  while ((pos = command.indexOf('|')) != -1) {
    parts[partIndex++] = command.substring(0, pos);
    command = command.substring(pos + 1);
  }
  parts[partIndex] = command;

  // Check the command type and delegate to appropriate handler
  if (parts[0] == "LED") {
    int id = parts[1].toInt();         // Extract LED ID
    String state = parts[2];           // Extract LED state (ON/OFF)
    int intensity = parts[4].toInt();  // Extract intensity value
    handleLED(id, state, intensity);
  } else if (parts[0] == "MOTOR") {
    int id = parts[1].toInt();         // Extract Motor ID
    String state = parts[2];           // Extract Motor state (ON/OFF)
    int speed = parts[4].toInt();      // Extract speed value
    String direction = parts[6];       // Extract direction (CW/CCW)
    handleMotor(id, state, speed, direction);
  } else if (parts[0] == "LIGHT_BARRIER") {
    int id = parts[1].toInt();         // Extract Light Barrier ID
    String status = parts[2];          // Extract Light Barrier status (OK/ERROR)
    handleLightBarrier(id, status);
  } else {
    sendError("Unknown command");      // Handle unknown commands
  }
}

// Function to control LEDs
void handleLED(int id, String state, int intensity) {
  if (state == "ON") {
    // Map intensity (0-100%) to PWM range (0-255)
    analogWrite(LED_PIN, map(intensity, 0, 100, 0, 255));
    sendACK("LED", id, "ON");          // Send acknowledgment
  } else if (state == "OFF") {
    analogWrite(LED_PIN, 0);           // Turn off the LED
    sendACK("LED", id, "OFF");         // Send acknowledgment
  } else {
    sendError("Invalid LED state");    // Send error for invalid state
  }
}

// Function to control motors
void handleMotor(int id, String state, int speed, String direction) {
  if (state == "ON") {
    // Map speed (0-5000 Hz) to PWM range (0-255)
    analogWrite(MOTOR_PIN, map(speed, 0, 5000, 0, 255)); // Adjust mapping as needed
    sendACK("MOTOR", id, "ON");         // Send acknowledgment
  } else if (state == "OFF") {
    analogWrite(MOTOR_PIN, 0);          // Turn off the motor
    sendACK("MOTOR", id, "OFF");        // Send acknowledgment
  } else {
    sendError("Invalid Motor state");   // Send error for invalid state
  }
}

// Function to monitor light barrier status
void handleLightBarrier(int id, String status) {
  if (status == "OK" || status == "ERROR") {
    sendACK("LIGHT_BARRIER", id, status); // Send acknowledgment with status
  } else {
    sendError("Invalid Light Barrier status"); // Send error for invalid status
  }
}

// Function to send acknowledgment (ACK) messages
void sendACK(String device, int id, String status) {
  Serial.print("ACK|");                 // Start ACK message
  Serial.print(device);                 // Include device type (LED/MOTOR/LIGHT_BARRIER)
  Serial.print("|");
  Serial.print(id);                     // Include device ID
  Serial.print("|");
  Serial.println(status);               // Include status (ON/OFF/OK/ERROR)
}

// Function to send error messages
void sendError(String description) {
  Serial.print("ERROR|");               // Start error message
  Serial.println(description);          // Include error description
}







🚀 Getting Started
Setting Up the Backend
<p> <strong>Ensure Prerequisites Are Met:</strong> </p> <ul> <li> <strong>Rust:</strong> Install Rust from <a href="https://www.rust-lang.org/" target="_blank">rust-lang.org</a>. </li> <li> <strong>Tauri CLI:</strong> Install Tauri's command-line interface by following <a href="https://tauri.app/v1/guides/getting-started/prerequisites" target="_blank">Tauri's installation guide</a>. </li> </ul> <p> <strong>Navigate to the Backend Directory:</strong> </p> <pre><code>cd dcubed-3d-printer-controller-developer/backend</code></pre>
⚙️ Error Handling
<p> The backend <strong>gracefully handles errors</strong> related to serial communication, including: </p> <ul> <li><strong>Failed Connections:</strong> If the serial port fails to open.</li> <li><strong>Write Operations:</strong> Issues when sending data over the serial port.</li> </ul> <p> Users are <strong>notified through dialog boxes</strong> with error details for better debugging and user experience. </p>

#Rust: Install Rust from rust-lang.org.
#Tauri CLI: Install Tauri's command-line interface by following Tauri's installation guide.
#Navigate to the Backend Directory

```bash

cd dcubed-3d-printer-controller-developer/backend
```

Build the Backend

```bash
cargo build
```
Run the Backend in Development Mode

```bash
cargo run
```

🔗 Integrating with the Frontend
<p> The backend is <strong>seamlessly integrated</strong> with the React frontend through <strong>Tauri's API</strong>. Commands defined in <code>main.rs</code> are accessible from the frontend, enabling actions such as: </p> <ul> <li><strong>Connecting to Serial Ports</strong></li> <li><strong>Sending Commands</strong></li> <li><strong>Managing Recordings</strong></li> </ul>
🔌 Serial Communication Protocol
<p> Effective communication between the <strong>DCubed 3D Printer Controller Developer</strong> application and the 3D printer's hardware is achieved through a well-defined <strong>serial communication protocol</strong>. </p> <p> Understanding this protocol is crucial for developers aiming to <strong>integrate</strong> or <strong>extend functionalities</strong>, especially when interfacing directly with the printer's firmware. </p>
🛠 Command Structure
<p> All commands sent from the application to the 3D printer's firmware follow a <strong>structured format</strong> to ensure consistency and reliability. </p> <p> Each command is a string composed of multiple parts: </p> <pre><code>COMMAND|PARAMETER1|PARAMETER2|...|<NEWLINE></code></pre> <ul> <li><strong>Delimiter:</strong> Each part of the command is separated by the <code>|</code> (pipe) character.</li> <li><strong>Termination:</strong> Commands are terminated with a newline character <code>\n</code>.</li> </ul> <p> This structure allows the firmware to <strong>parse</strong> and <strong>interpret</strong> commands accurately, ensuring proper execution. </p>

### 🤝 **Contributing**

We welcome contributions from the community! Please follow these steps to contribute:

1. **🔗 Fork the Repository**

2. **🌿 Create a New Branch**
    ```bash
    git checkout -b feature/YourFeature
    ```

3. **✍️ Make Your Changes**

4. **💾 Commit Your Changes**
    ```bash
    git commit -m "Add Your Feature"
    ```

5. **🚀 Push to Your Fork**
    ```bash
    git push origin feature/YourFeature
    ```

6. **🔀 Open a Pull Request**

#### 📋 **Guidelines**

- **⚙️ Code Quality:**  
  Ensure that your code adheres to the project's coding standards and passes all linting checks.

- **📝 Documentation:**  
  Document your code and any new features or changes thoroughly.

- **✅ Testing:**  
  Include tests for new functionalities to maintain the application's reliability.

- **✉️ Commit Messages:**  
  Use clear and descriptive commit messages to explain the purpose of your changes.

---

### 📄 **License**

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). See the [LICENSE](LICENSE) file for more details.