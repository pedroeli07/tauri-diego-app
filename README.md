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
   - To control the LEDs, ensure a serial port is connected; otherwise, no actions can be performed.  
   - LEDs can be toggled **ON/OFF** directly or by selecting an intensity value using sliders or input fields and clicking the **Update** button.  
   - When the **Update** button is clicked, the selected intensity is sent as a command to the printer via the connected serial port.  
   - Once the printer processes the command and sends a response back, the LED's status is updated in the interface accordingly.

- **⚙️ Motors**  
   - Motors also require a connected serial port for interaction.  
   - You can start or stop motors by toggling their status, or set a specific **speed** using sliders or input fields and clicking the **Update** button to send the command.  
   - The **direction** of the motor can be switched between clockwise (CW) and counterclockwise (CCW) using the direction toggle.  
   - Upon receiving a response from the printer, the motor's status, speed, and direction are reflected in the GUI.

- **💡 Light Barriers**  
   - Monitor the real-time status of light barriers with visual indicators on the interface.  
   - The interface updates automatically based on the printer's responses through the serial connection.


---

## 2. Control Hardware Components

### 🔌 Connection to the Serial Port

#### Without Connection:
- **Controls Disabled:** All controls (buttons, sliders, input fields) will be disabled, preventing any interaction with the hardware components.
- **Visual Indication:** A notification or indicator on the interface will inform that no port is connected.

#### With Connection:
- **Controls Enabled:** Upon connecting the serial port, the controls will be activated, allowing you to interact with LEDs, motors, and other components.
- **Connection Feedback:** The interface will display the connection status, indicating that it is ready for use.

### 🟢 LEDs

#### Control Methods:

##### On/Off Button:
- **Turn On LED:** Click the **ON** button to immediately light up the LED.
- **Turn Off LED:** Click the **OFF** button to turn off the LED.

##### Intensity Adjustment:
- **Select Intensity:** Use the slider or input field to set the desired LED intensity.
- **Confirm Changes:** After selecting the intensity, click the **Update** icon to apply the changes.

##### Command Sending:
- **Sending Commands:** Actions to turn on/off or adjust intensity send commands via the serial port to the printer.
- **Interface Confirmation:** Once the printer receives and processes the command, the LED status and intensity will be updated in the graphical user interface (GUI).

### ⚙️ Motors

#### Control Methods:

##### Start/Stop Motor:
- **Start Motor:** Click the **Start** button to immediately start the motor.
- **Stop Motor:** Click the **Stop** button to stop the motor.

##### Speed and Direction Adjustment:
- **Set Speed:** Use the slider or input field to define the motor speed.
- **Select Direction:** Toggle the direction between **CW** (clockwise) and **CCW** (counter-clockwise) by clicking the direction button.
- **Confirm Changes:** After setting the speed and direction, click the **Update** icon to apply the changes.

##### Command Sending:
- **Sending Commands:** Actions to start/stop or adjust speed/direction send commands via the serial port to the printer.
- **Interface Confirmation:** Once the printer receives and processes the command, the motor status, speed, and direction will be updated in the graphical user interface (GUI).

### 💡 Light Barriers

#### Real-Time Monitoring:
- **Visual Indicators:** The status of the light barriers is monitored in real-time with colored indicators on the interface.

#### Indicator Colors:
- 🟢 **Green:** Status OK
- 🟡 **Yellow:** Warning
- 🔴 **Red:** Error



## 3. Logging and Exporting

#### Log Filters:
- Use the filters in the **Debug Box** to view specific logs related to the light barriers.

### 🔍 Real-Time Log Viewing in the Debug Box

#### View Logs:
- **Real-Time Monitoring:** Track logs in real-time in the **Debug Box**, providing insights into system operations and interactions with hardware components as they occur.

#### Log Filters:

##### Advanced Filtering:
- **Filtering Criteria:** Use filters to refine log viewing based on criteria such as log level (**Info**, **Warning**, **Error**), component (**LEDs**, **Motors**, **Light Barriers**), or status.

##### Easy Navigation:
- **Simplified Navigation:** Filters allow you to quickly find relevant logs, facilitating diagnosis and problem resolution.

#### Colored Logs:
- 🟢 **Green:** Information about normal operations.
- 🟡 **Yellow:** Warnings about potential issues that require attention.
- 🔴 **Red:** Critical errors that need immediate resolution.
- 🔵 **Blue:** Debug messages for detailed analysis.

### 📁 Log Exporting

#### Available Formats:
Export your logs in the following formats:
- **CSV**
- **PDF**
- **Excel**

#### How to Export:

##### Export Buttons:
- **Export Logs:** Click the **Export CSV**, **Export PDF**, or **Export Excel** buttons to download the logs in the desired format.

##### Using Exported Logs:
- **Analysis and Reporting:** Use the exported logs for external analysis, reports, or audits as needed.

### Operation Logic

#### Connection to the Serial Port:

##### Before Connection:
- **Controls Disabled:** All controls are disabled, preventing interactions with the hardware components.
- **Connection Indicator:** The interface will display an indicator that no port is connected.

##### After Connection:
- **Controls Enabled:** Controls are activated, allowing interaction with LEDs, motors, and other components.
- **Status Update:** The interface updates to reflect the connection status, indicating it is ready for use.

#### Component Control:

##### Dual Control Methods:

###### Direct Control:
- **LEDs:** Click the **ON/OFF** buttons to immediately turn LEDs on or off.
- **Motors:** Click the **Start/Stop** buttons to immediately start or stop the motors.

###### Adjustment Control:
- **LEDs:** Adjust the intensity using sliders or input fields and click **Update** to apply the change.
- **Motors:** Adjust the speed and direction using sliders or input fields and click **Update** to apply the changes.

##### Command Sending:
- **Communication with Printer:** Control actions send commands via the serial port to the printer.

##### Confirmation and Feedback:
- **Printer Response:** Once the printer receives and processes the command, it sends a response.
- **Interface Update:** The graphical user interface (GUI) automatically updates the status and settings of the components based on the received response, ensuring the interface reflects the actual hardware state.


## Final Considerations

- **Stable Connection:**
  - Maintain a stable connection to the serial port to ensure effective communication between the interface and hardware components.

- **Log Monitoring:**
  - Use the **Debug Box** to monitor and analyze logs, facilitating the detection and resolution of issues.

- **Real-Time Feedback:**
  - The interface automatically updates the status of components based on the printer's responses, providing a dynamic and responsive user experience.


---

### 4. **Production Mode**

- Switch between **Development Mode** and **Production Mode** using the **Production** button.  
- This mode optimizes performance for real-world use cases and hardware testing.

---

With these features, you can efficiently control, monitor, and debug your 3D printer hardware in both development and production environments. 🎯

---

# Serial Communication Protocol (Binary Format)

With the transition to a binary-based communication protocol, the DCubed 3D Printer Controller Developer application now interacts with the printer's firmware using fixed-length 7-byte binary messages instead of delimited ASCII strings. This approach enhances efficiency, consistency, and reduces the likelihood of communication errors.

## Overview
- **Protocol Type:** Binary (7-byte fixed-length messages)
- **Purpose:** To control hardware components (LEDs, Motors) and handle system-level commands.
- **Compatibility:** Hybrid approach using binary for hardware-related commands and ASCII for system-level commands (e.g., RESET, PRODUCTION_MODE).

## Command Structure (Binary)
All commands sent from the application to the printer firmware follow a fixed 7-byte binary format:

```plaintext
[COMMAND_ID (1 byte), HARDWARE_ID (1 byte), VALUE (4 bytes, little-endian), '\n' (1 byte)]
```
### Field Descriptions:
- **COMMAND_ID (1 byte):** Numeric identifier representing the type of command (e.g., turn LED on/off, motor state).
- **HARDWARE_ID (1 byte):** Numeric ID of the specific hardware component (e.g., LED number, Motor number).
- **VALUE (4 bytes, little-endian):** 32-bit unsigned integer representing the value of the parameter.
  - **LEDs:** Intensity (0-100)
  - **Motors:** Speed (0-5000), Direction (0 or 1), State (0 or 1)
- **END_CHAR (1 byte):** Newline character (0x0A) indicating the end of the command.

### Example: Turn on LED 3 at 100% intensity
- **COMMAND_ID:** 7 (LED State)
- **HARDWARE_ID:** 3 (LED Number)
- **VALUE:** 100 (0x64 in hexadecimal)
- **Binary Message:** 
- **COMMAND_ID**: A numeric identifier representing the type of command (e.g., LED on/off, motor state).
- **HARDWARE_ID**: Numeric ID of the specific hardware component (e.g., LED number, Motor number).
- **VALUE**: A 32-bit unsigned integer (4 bytes, little-endian) representing the parameter's value.
  - For LEDs: intensity (0-100)
  - For Motors: speed (0-5000), direction (0 or 1), state (0 or 1)
- **'\n' (0x0A)**: A newline character (1 byte) indicating the end of the command.

The final 7-byte message could look like:
`[7, 3, 0x64, 0x00, 0x00, 0x00, 0x0A`

Here, `100` is stored as `0x64 0x00 0x00 0x00` in little-endian form:
`[7, 3, 0x64, 0x00, 0x00, 0x00, 0x0A]`

## Detailed Command Table

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>COMMAND_ID</th>
      <th>Action</th>
      <th>HARDWARE_ID</th>
      <th>VALUE Interpretation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Motor Direction</td>
      <td>Motor ID</td>
      <td>0 = CW (Clockwise), 1 = CCW (Counter-clockwise)</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Motor Speed</td>
      <td>Motor ID</td>
      <td>Speed in Hz (0-5000)</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Motor State</td>
      <td>Motor ID</td>
      <td>0 = OFF, 1 = ON</td>
    </tr>
    <tr>
      <td>7</td>
      <td>LED State</td>
      <td>LED ID</td>
      <td>0 = OFF, 1 = ON</td>
    </tr>
    <tr>
      <td>8</td>
      <td>LED Intensity</td>
      <td>LED ID</td>
      <td>Intensity Level (0-100)</td>
    </tr>
    <tr>
      <td>9</td>
      <td>LED Combined Update</td>
      <td>LED ID</td>
      <td>Combination of state and intensity: (Intensity << 16) | State</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Motor Toggle State</td>
      <td>Motor ID</td>
      <td>0 = OFF, 1 = ON</td>
    </tr>
    <tr>
      <td>11</td>
      <td>Adjust Motor Speed</td>
      <td>Motor ID</td>
      <td>Speed in Hz (0-5000)</td>
    </tr>
    <tr>
      <td>12</td>
      <td>Motor Toggle Direction</td>
      <td>Motor ID</td>
      <td>0 = CW (Clockwise), 1 = CCW (Counter-clockwise)</td>
    </tr>
    <tr>
      <td>0x01</td>
      <td>Reset</td>
      <td>0x00</td>
      <td>RESET\n (legacy ASCII command)</td>
    </tr>
    <tr>
      <td>0x02</td>
      <td>Production Mode</td>
      <td>0x00</td>
      <td>PRODUCTION_MODE\n (legacy ASCII command)</td>
    </tr>
    <tr>
      <td>0x04</td>
      <td>Record Serial</td>
      <td>0x00</td>
      <td>RECORD_SERIAL\n or STOP_RECORD_SERIAL\n (ASCII)</td>
    </tr>
  </tbody>
</table>

**Note:** Commands like RESET, PRODUCTION_MODE, RECORD_SERIAL, and STOP_RECORD_SERIAL remain ASCII-based for compatibility and simplicity. The binary protocol is primarily used for hardware-related commands (LED, Motor, Light Barrier).

## Command Bit Structure

For a deeper understanding, below is the bit-level specification for each command:

| Field         | Bit Range | Description                                    |
|---------------|-----------|------------------------------------------------|
| **COMMAND_ID** | 0-7       | Identifies the type of command (e.g., LED, Motor) |
| **HARDWARE_ID**| 8-15      | Specifies the target hardware component        |
| **VALUE**      | 16-47     | Parameter value (interpreted based on COMMAND_ID) |
| **END_CHAR**   | 48-55     | Newline character (0x0A) to end the command    |

### Example Command

- **Command:** Turn on LED 3 at 100% intensity
  - **COMMAND_ID:** 7 (LED State)
  - **HARDWARE_ID:** 3 (LED Number)
  - **VALUE:** 100 (0x64 in hexadecimal)
  - **END_CHAR:** 0x0A
  - **Binary Message:**
 
`[7, 3, 0x64, 0x00, 0x00, 0x00, 0x0A]`
---

## Command Table for C/C++ Developers

To aid development in C or C++, below are enumerator definitions and structs representing the binary communication protocol:

```c
// Command ID Definitions
typedef enum {
  CMD_RESET = 0x01,
  CMD_PRODUCTION_MODE = 0x02,
  CMD_RECORD_SERIAL = 0x04,
  CMD_MOTOR_DIRECTION = 0x01,
  CMD_MOTOR_SPEED = 0x02,
  CMD_MOTOR_STATE = 0x03,
  CMD_LED_STATE = 0x07,
  CMD_LED_INTENSITY = 0x08,
  CMD_LED_COMBINED_UPDATE = 0x09,
  CMD_MOTOR_TOGGLE_STATE = 0x0A,
  CMD_MOTOR_ADJUST_SPEED = 0x0B,
  CMD_MOTOR_TOGGLE_DIRECTION = 0x0C
} CommandID;

// Binary Command Structure
typedef struct {
  uint8_t command_id;    // COMMAND_ID
  uint8_t hardware_id;   // HARDWARE_ID
  uint32_t value;        // VALUE (Little-endian)
  uint8_t end_char;      // END_CHAR (0x0A)
} __attribute__((packed)) SerialCommand;
```

Utility Functions for Command Construction and Transmission
Below are example functions in C for building and sending binary commands:


```c
#include <stdint.h>
#include <string.h>

// Convert integer to little-endian format
uint32_t to_little_endian(uint32_t value) {
    uint32_t little_endian = 0;
    little_endian |= (value & 0x000000FF) << 0;
    little_endian |= (value & 0x0000FF00) << 8;
    little_endian |= (value & 0x00FF0000) << 16;
    little_endian |= (value & 0xFF000000) >> 24;
    return little_endian;
}

// Build command
void build_command(SerialCommand* cmd, uint8_t command_id, uint8_t hardware_id, uint32_t value) {
    cmd->command_id = command_id;
    cmd->hardware_id = hardware_id;
    cmd->value = to_little_endian(value);
    cmd->end_char = 0x0A;
}

// Send command via serial
// Actual serial communication implementation will be needed
int send_serial_command(SerialCommand* cmd) {
    // Example send (depends on serial communication library used)
    // You'll need to implement actual sending through the serial port
    return 1; // Return 1 for success, 0 for failure
}

// Example usage
int main() {
    SerialCommand cmd;
    build_command(&cmd, CMD_LED_STATE, 3, 1); // Turn on LED 3
    if(send_serial_command(&cmd)) {
        // Command sent successfully
    } else {
        // Failed to send command
    }
    return 0;
}
```
## Utility Functions for Command Construction and Transmission

Below are example functions in C for building and sending binary commands:

```c
#include <stdint.h>
#include <string.h>

// Convert integer to little-endian format
uint32_t to_little_endian(uint32_t value) {
    uint32_t little_endian = 0;
    little_endian |= (value & 0x000000FF) << 0;
    little_endian |= (value & 0x0000FF00) << 8;
    little_endian |= (value & 0x00FF0000) << 16;
    little_endian |= (value & 0xFF000000) >> 24;
    return little_endian;
}

// Build command
void build_command(SerialCommand* cmd, uint8_t command_id, uint8_t hardware_id, uint32_t value) {
    cmd->command_id = command_id;
    cmd->hardware_id = hardware_id;
    cmd->value = to_little_endian(value);
    cmd->end_char = 0x0A;
}

// Send command via serial
// Actual serial communication implementation will be needed
int send_serial_command(SerialCommand* cmd) {
    // Example send (depends on serial communication library used)
    // You'll need to implement actual sending through the serial port
    return 1; // Return 1 for success, 0 for failure
}

// Example usage
int main() {
    SerialCommand cmd;
    build_command(&cmd, CMD_LED_STATE, 3, 1); // Turn on LED 3
    if(send_serial_command(&cmd)) {
        // Command sent successfully
    } else {
        // Failed to send command
    }
    return 0;
}

## 🛠️ C/C++ Integration Guide (Binary Protocol)

For developers working on the 3D printer firmware in **C** or **C++**, understanding the binary-based serial communication protocol is crucial. The following guidelines detail how to parse incoming binary commands and how to send back binary or ASCII responses as needed.

### 🔄 Parsing Incoming Commands (Binary)

1. **📥 Read Incoming Data**
   - Continuously read 7 bytes from the serial port.
   - After reading 7 bytes, you have one full command.

2. **🔍 Parse the Binary Command**
   - `COMMAND_ID = data[0]` (1 byte)
   - `HARDWARE_ID = data[1]` (1 byte)
   - `VALUE = uint32_t` formed from `data[2], data[3], data[4], data[5]` in little-endian.
   - `END_CHAR = data[6]` should be `0x0A`.

   If `END_CHAR != 0x0A`, the command is invalid.

3. **⚙️ Execute Actions**
   - Based on `COMMAND_ID` and `HARDWARE_ID`, adjust hardware states:
     - If `COMMAND_ID=7` (LED state), `VALUE=0` or `1` sets LED OFF/ON.
     - If `COMMAND_ID=8` (LED intensity), `VALUE=0-100` sets LED intensity.
     - If `COMMAND_ID=3` (Motor state), `VALUE=0 or 1` sets motor OFF/ON.
     - If `COMMAND_ID=2` (Motor speed), `VALUE=0-5000` sets motor speed.
     - If `COMMAND_ID=1` (Motor direction), `VALUE=0 or 1` sets CW/CCW.

4. **✅ Send Responses**
   - For hardware state changes, send back binary states if needed.
   - For errors, send `ERROR|...` in ASCII.
   - For legacy commands like `RESET` or `PRODUCTION_MODE` (still ASCII), send `ACK|...` or `ERROR|...` in ASCII.

---

### 📤 Formatting and Sending Responses

1. **🔧 Binary Response for Hardware**
   - Use the same 7-byte format:
     `[COMMAND_ID, HARDWARE_ID, VALUE (4 bytes), 0x0A]`

   **Example:** LED 3 ON with intensity 100%:
   - `[7, 3, 100, 0, 0, 0, 0x0A]`
   - `[8, 3, 100, 0, 0, 0, 0x0A]` for intensity.

2. **⚠️ Error Messages (ASCII)**
   - For invalid commands or unexpected parameters:
     `ERROR|<DESCRIPTION>\n`

3. **ACK Messages (ASCII)**
   - For successfully processed legacy ASCII commands like `RESET`:
     `ACK|RESET\n`

---
Detailed Command Specification
To enhance clarity, the following table provides an exhaustive specification of each command, including byte-wise details and corresponding code functions.

<div> <table> <thead> <tr> <th>Command</th> <th>COMMAND_ID</th> <th>HARDWARE_ID</th> <th>VALUE</th> <th>Description</th> <th>Code Reference</th> </tr> </thead> <tbody> <tr> <td>LED Set State</td> <td>7</td> <td>LED Number (1 byte)</td> <td>0 = OFF, 1 = ON (4 bytes little-endian)</td> <td>Turns the specified LED on or off</td> <td><code>handleLEDCommand</code></td> </tr> <tr> <td>LED Set Intensity</td> <td>8</td> <td>LED Number (1 byte)</td> <td>Intensity Level (0-100) (4 bytes little-endian)</td> <td>Sets the brightness of the specified LED</td> <td><code>handleLEDCommand</code></td> </tr> <tr> <td>Motor Set Direction</td> <td>1</td> <td>Motor Number (1 byte)</td> <td>0 = CW, 1 = CCW (4 bytes little-endian)</td> <td>Sets the rotation direction of the specified motor</td> <td><code>handleMotorCommand</code></td> </tr> <tr> <td>Motor Set Speed</td> <td>2</td> <td>Motor Number (1 byte)</td> <td>Speed in Hz (0-5000) (4 bytes little-endian)</td> <td>Sets the speed of the specified motor</td> <td><code>handleMotorCommand</code></td> </tr> <tr> <td>Motor Set State</td> <td>3</td> <td>Motor Number (1 byte)</td> <td>0 = OFF, 1 = ON (4 bytes little-endian)</td> <td>Turns the specified motor on or off</td> <td><code>handleMotorCommand</code></td> </tr> <tr> <td>Reset</td> <td>-</td> <td>-</td> <td>Sent as ASCII string: `RESET\n`</td> <td>Resets the printer firmware</td> <td><code>handleReset</code></td> </tr> <tr> <td>Production Mode</td> <td>-</td> <td>-</td> <td>Sent as ASCII string: `PRODUCTION_MODE\n`</td> <td>Enters production mode</td> <td><code>handleProductionMode</code></td> </tr> <tr> <td>Record Serial</td> <td>-</td> <td>-</td> <td>Sent as ASCII string: `RECORD_SERIAL\n` ou `STOP_RECORD_SERIAL\n`</td> <td>Starts or stops recording serial data</td> <td><code>handleRecordSerial</code></td> </tr> </tbody> </table> </div>

---

### 📝 Sample C++ Code Snippet for Parsing Binary Commands

```cpp
#include <Arduino.h>

void setup() {
  Serial.begin(115200);
}

void loop() {
  if (Serial.available() >= 7) {
    uint8_t data[7];
    Serial.readBytes(data, 7);
    processCommand(data);
  }
}

void processCommand(uint8_t data[7]) {
  uint8_t command_id = data[0];
  uint8_t hardware_id = data[1];
  uint32_t value = (uint32_t)data[2] | ((uint32_t)data[3]<<8) | ((uint32_t)data[4]<<16) | ((uint32_t)data[5]<<24);
  uint8_t end_char = data[6];

  if (end_char != 0x0A) {
    sendError("Invalid end char");
    return;
  }

  // Example handling:
  if (command_id == 7) { // LED state
    if (hardware_id == 1 && (value != 0 && value != 1)) {
      // If we want to force an error for LED 1
      sendError("Invalid command for LED 1");
      return;
    }
    // Otherwise, set LED state
    // ... set LED hardware ...
    sendACK("LED"); // Or send binary response if needed
  } else if (command_id == 8) { // LED Intensity
    // Set intensity
    // ...
    sendACK("LEDPWM");
  } else {
    sendError("Unknown command_id");
  }
}

void sendACK(const char* cmd) {
  Serial.print("ACK|");
  Serial.print(cmd);
  Serial.print("\n");
}

void sendError(const char* desc) {
  Serial.print("ERROR|");
  Serial.print(desc);
  Serial.print("\n");
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

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th style="border: 1px solid #ddd; padding: 12px;">COMMAND_ID</th>
      <th style="border: 1px solid #ddd; padding: 12px;">Action</th>
      <th style="border: 1px solid #ddd; padding: 12px;">HARDWARE_ID</th>
      <th style="border: 1px solid #ddd; padding: 12px;">VALUE Interpretation</th>
      <th style="border: 1px solid #ddd; padding: 12px;">Example Action</th>
      <th style="border: 1px solid #ddd; padding: 12px;">Example Command Sent</th>
      <th style="border: 1px solid #ddd; padding: 12px;">Command Breakdown</th>
      <th style="border: 1px solid #ddd; padding: 12px;">C/C++ Code Example</th>
      <th style="border: 1px solid #ddd; padding: 12px;">Example Log Messages</th>
    </tr>
  </thead>
  <tbody>
    <!-- Motor Direction -->
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Set Motor Direction</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">Motor ID</td>
      <td style="border: 1px solid #ddd; padding: 10px;">0 = CW (Clockwise), 1 = CCW (Counter-clockwise)</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Set Motor 1 to Clockwise (CW)</td>
      <td style="border: 1px solid #ddd; padding: 10px;">[1, 1, 0, 0, 0, 0, 10]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>1:</strong> COMMAND_ID for Motor Direction</li>
          <li><strong>1:</strong> HARDWARE_ID for Motor 1</li>
          <li><strong>0, 0, 0, 0:</strong> VALUE = 0 (CW)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td style="border: 1px solid #ddd; padding: 10px;">
        <pre style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
<code>
// Set Motor 1 to Clockwise
SerialCommand cmd;
build_command(&cmd, CMD_MOTOR_DIRECTION, 1, 0);
send_serial_command(&cmd);
</code>
        </pre>
      </td>
      <td style="border: 1px solid #ddd; padding: 10px;">
        <pre style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
<code>
[15:51:02] Changing direction of Motor 1 to CW...
[15:51:02] Command Sent: [1, 1, 0, 0, 0, 0, 10]
[15:51:02] Motor 1 direction set to CW.
[15:51:02] Serial event listeners set up successfully (binary).
</code>
        </pre>
      </td>
    </tr>

    <!-- Motor Speed -->
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Set Motor Speed</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">Motor ID</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Speed in Hz (0-5000)</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Set Motor 1 speed to 2500 Hz</td>
      <td style="border: 1px solid #ddd; padding: 10px;">[2, 1, 208, 9, 0, 0, 10]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>2:</strong> COMMAND_ID for Motor Speed</li>
          <li><strong>1:</strong> HARDWARE_ID for Motor 1</li>
          <li><strong>208, 9, 0, 0:</strong> VALUE = 2500 (0x09D0)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td style="border: 1px solid #ddd; padding: 10px;">
        <pre style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
<code>
// Set Motor 1 speed to 2500 Hz
SerialCommand cmd;
build_command(&cmd, CMD_MOTOR_SPEED, 1, 2500);
send_serial_command(&cmd);
</code>
        </pre>
      </td>
      <td style="border: 1px solid #ddd; padding: 10px;">
        <pre style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
<code>
[15:51:02] Setting speed of Motor 1 to 2500 Hz...
[15:51:02] Command Sent: [2, 1, 208, 9, 0, 0, 10]
[15:51:02] Motor 1 speed set to 2500 Hz.
[15:51:02] Serial event listeners set up successfully (binary).
</code>
        </pre>
      </td>
    </tr>

    <!-- Adicione mais linhas conforme necessário seguindo o mesmo padrão -->
    
    <!-- Exemplo de outra linha (Motor State) -->
    <tr>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Set Motor State</td>
      <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">Motor ID</td>
      <td style="border: 1px solid #ddd; padding: 10px;">0 = OFF, 1 = ON</td>
      <td style="border: 1px solid #ddd; padding: 10px;">Turn Motor 1 ON</td>
      <td style="border: 1px solid #ddd; padding: 10px;">[3, 1, 1, 0, 0, 0, 10]</td>
      <td style="border: 1px solid #ddd; padding: 10px;">
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>3:</strong> COMMAND_ID for Motor State</li>
          <li><strong>1:</strong> HARDWARE_ID for Motor 1</li>
          <li><strong>1, 0, 0, 0:</strong> VALUE = 1 (ON)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td style="border: 1px solid #ddd; padding: 10px;">
        <pre style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
<code>
// Turn Motor 1 ON
SerialCommand cmd;
build_command(&cmd, CMD_MOTOR_STATE, 1, 1);
send_serial_command(&cmd);
</code>
        </pre>
      </td>
      <td style="border: 1px solid #ddd; padding: 10px;">
        <pre style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">
<code>
[15:51:02] Turning Motor 1 ON...
[15:51:02] Command Sent: [3, 1, 1, 0, 0, 0, 10]
[15:51:02] Motor 1 is now ON.
[15:51:02] Serial event listeners set up successfully (binary).
</code>
        </pre>
      </td>
    </tr>
  </tbody>
</table>


Detailed Example Breakdown
To further clarify how commands are constructed and sent, let's dissect the specific example you provided where you changed the intensity of LED 2 to 81% and clicked "Update".

Example Action:
You clicked a LED that was OFF, changed its intensity to 81%, and clicked "Update".

Command Sent:
csharp
Copiar código
[8, 2, 81, 0, 0, 0, 10]
Command Breakdown:
Byte 1 (8): COMMAND_ID for LED Intensity.
Byte 2 (2): HARDWARE_ID for LED 2.
Bytes 3-6 (81, 0, 0, 0):
VALUE in little-endian format.
81 represents the intensity level (81%).
Byte 7 (10): END_CHAR (Newline character) indicating the end of the command.
C/C++ Code Example:
c
Copiar código
// Change intensity of LED 2 to 81% and update
SerialCommand cmd;
build_command(&cmd, CMD_LED_INTENSITY, 2, 81);
send_serial_command(&cmd);
What Happens:
Constructing the Command:

COMMAND_ID (8): Specifies that this command is to set the LED intensity.
HARDWARE_ID (2): Targets LED number 2.
VALUE (81): Sets the intensity of LED 2 to 81%.
END_CHAR (10): Indicates the end of the command.
Sending the Command:

The build_command function constructs the SerialCommand structure with the specified parameters.
The send_serial_command function sends the 7-byte command via the serial port.
Firmware Action:

Upon receiving the command, the firmware interprets it as a request to set LED 2's intensity to 81%.
LED 2 is updated accordingly and turned ON with 81% intensity.
Received Response Example:
csharp
Copiar código
[7, 2, 1, 0, 0, 0, 10]
COMMAND_ID (7): LED State
HARDWARE_ID (2): LED 2
VALUE (1): LED is ON
END_CHAR (10): Newline character
Parsed Interpretation:
LED 2 updated: ON
Intensity: 81%
Corresponding Log Messages:
plaintext
Copiar código
[15:51:00] Logs cleared.
[15:51:02] Changing intensity of LED 2 to 81%...
[15:51:02] Command Sent: [8, 2, 81, 0, 0, 0, 10]
[15:51:02] LED 2 updated to ON with intensity 81%
[15:51:02] Intensity of LED 2 set to 81%.
[15:51:02] Serial event listeners set up successfully (binary).
Additional Notes
Removing Commas:

The binary command is sent as a continuous stream of bytes without commas. The commas are only for readability in documentation.
For example, [8, 2, 81, 0, 0, 0, 10] is sent as the byte sequence 08 02 51 00 00 00 0A.
Understanding Each Number:

COMMAND_ID: Specifies the type of action (e.g., LED, Motor).
HARDWARE_ID: Identifies the target hardware component (e.g., LED number, Motor number).
VALUE: Provides the parameter for the action (e.g., intensity level, speed).
END_CHAR: Indicates the end of the command (always 10 for newline).
Legacy ASCII Commands:

Commands like RESET, PRODUCTION_MODE, and RECORD_SERIAL use ASCII strings for simplicity and compatibility.
These commands still follow the 7-byte structure but primarily use the COMMAND_ID to trigger specific firmware actions.




<table>
  <thead>
    <tr>
      <th>COMMAND_ID</th>
      <th>Action</th>
      <th>HARDWARE_ID</th>
      <th>VALUE Interpretation</th>
      <th>Example Command Received</th>
      <th>Command Breakdown</th>
      <th>C/C++ Code Example</th>
      <th>Example Response Sent</th>
    </tr>
  </thead>
  <tbody>
    <!-- Motor Direction -->
    <tr>
      <td>1</td>
      <td>Set Motor Direction</td>
      <td>Motor ID</td>
      <td>0 = CW (Clockwise), 1 = CCW (Counter-clockwise)</td>
      <td>[1, 1, 0, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>1:</strong> COMMAND_ID for Motor Direction</li>
          <li><strong>1:</strong> HARDWARE_ID for Motor 1</li>
          <li><strong>0, 0, 0, 0:</strong> VALUE = 0 (CW)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_MOTOR_DIRECTION 1

// Function to handle Motor Direction Command
void handleMotorDirection(uint8_t hardware_id, uint32_t value) {
    Motor* motor = getMotorById(hardware_id);
    if (motor == NULL) {
        // Handle invalid Motor ID
        sendErrorResponse(CMD_MOTOR_DIRECTION, hardware_id);
        return;
    }

    if (value == 0) {
        motor->direction = CW;
        // Implement hardware-specific direction change
        setMotorDirectionCW(motor);
    } else if (value == 1) {
        motor->direction = CCW;
        // Implement hardware-specific direction change
        setMotorDirectionCCW(motor);
    } else {
        // Handle invalid value
        sendErrorResponse(CMD_MOTOR_DIRECTION, hardware_id);
        return;
    }

    // Send acknowledgment response
    sendAckResponse(CMD_MOTOR_DIRECTION, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 1, 1, 0, 0, 0, 10] // ACK for Motor Direction
        </code></pre>
      </td>
    </tr>
    
    <!-- Motor Speed -->
    <tr>
      <td>2</td>
      <td>Set Motor Speed</td>
      <td>Motor ID</td>
      <td>Speed in Hz (0-5000)</td>
      <td>[2, 1, 208, 9, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>2:</strong> COMMAND_ID for Motor Speed</li>
          <li><strong>1:</strong> HARDWARE_ID for Motor 1</li>
          <li><strong>208, 9, 0, 0:</strong> VALUE = 2500 (0x09D0)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_MOTOR_SPEED 2

// Function to handle Motor Speed Command
void handleMotorSpeed(uint8_t hardware_id, uint32_t value) {
    Motor* motor = getMotorById(hardware_id);
    if (motor == NULL) {
        // Handle invalid Motor ID
        sendErrorResponse(CMD_MOTOR_SPEED, hardware_id);
        return;
    }

    if (value > 5000) {
        // Handle invalid speed
        sendErrorResponse(CMD_MOTOR_SPEED, hardware_id);
        return;
    }

    motor->speed = value;
    // Implement hardware-specific speed setting
    setMotorSpeed(motor, value);

    // Send acknowledgment response
    sendAckResponse(CMD_MOTOR_SPEED, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 2, 1, 0, 0, 0, 10] // ACK for Motor Speed
        </code></pre>
      </td>
    </tr>
    
    <!-- Motor State -->
    <tr>
      <td>3</td>
      <td>Set Motor State</td>
      <td>Motor ID</td>
      <td>0 = OFF, 1 = ON</td>
      <td>[3, 1, 1, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>3:</strong> COMMAND_ID for Motor State</li>
          <li><strong>1:</strong> HARDWARE_ID for Motor 1</li>
          <li><strong>1, 0, 0, 0:</strong> VALUE = 1 (ON)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_MOTOR_STATE 3

// Function to handle Motor State Command
void handleMotorState(uint8_t hardware_id, uint32_t value) {
    Motor* motor = getMotorById(hardware_id);
    if (motor == NULL) {
        // Handle invalid Motor ID
        sendErrorResponse(CMD_MOTOR_STATE, hardware_id);
        return;
    }

    if (value == 0) {
        motor->state = OFF;
        // Implement hardware-specific motor stop
        stopMotor(motor);
    } else if (value == 1) {
        motor->state = ON;
        // Implement hardware-specific motor start
        startMotor(motor);
    } else {
        // Handle invalid value
        sendErrorResponse(CMD_MOTOR_STATE, hardware_id);
        return;
    }

    // Send acknowledgment response
    sendAckResponse(CMD_MOTOR_STATE, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 3, 1, 0, 0, 0, 10] // ACK for Motor State
        </code></pre>
      </td>
    </tr>
    
    <!-- LED State -->
    <tr>
      <td>7</td>
      <td>Set LED State</td>
      <td>LED ID</td>
      <td>0 = OFF, 1 = ON</td>
      <td>[7, 2, 1, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>7:</strong> COMMAND_ID for LED State</li>
          <li><strong>2:</strong> HARDWARE_ID for LED 2</li>
          <li><strong>1, 0, 0, 0:</strong> VALUE = 1 (ON)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_LED_STATE 7

// Function to handle LED State Command
void handleLEDState(uint8_t hardware_id, uint32_t value) {
    LED* led = getLEDById(hardware_id);
    if (led == NULL) {
        // Handle invalid LED ID
        sendErrorResponse(CMD_LED_STATE, hardware_id);
        return;
    }

    if (value == 0) {
        led->state = OFF;
        // Implement hardware-specific LED off
        setLEDState(led, OFF);
    } else if (value == 1) {
        led->state = ON;
        // Implement hardware-specific LED on
        setLEDState(led, ON);
    } else {
        // Handle invalid value
        sendErrorResponse(CMD_LED_STATE, hardware_id);
        return;
    }

    // Send acknowledgment response
    sendAckResponse(CMD_LED_STATE, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 7, 2, 1, 0, 0, 10] // ACK for LED State
        </code></pre>
      </td>
    </tr>
    
    <!-- LED Intensity -->
    <tr>
      <td>8</td>
      <td>Set LED Intensity</td>
      <td>LED ID</td>
      <td>Intensity Level (0-100)</td>
      <td>[8, 3, 81, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>8:</strong> COMMAND_ID for LED Intensity</li>
          <li><strong>3:</strong> HARDWARE_ID for LED 3</li>
          <li><strong>81, 0, 0, 0:</strong> VALUE = 81 (0x51)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_LED_INTENSITY 8

// Function to handle LED Intensity Command
void handleLEDIntensity(uint8_t hardware_id, uint32_t value) {
    LED* led = getLEDById(hardware_id);
    if (led == NULL) {
        // Handle invalid LED ID
        sendErrorResponse(CMD_LED_INTENSITY, hardware_id);
        return;
    }

    if (value > 100) {
        // Handle invalid intensity
        sendErrorResponse(CMD_LED_INTENSITY, hardware_id);
        return;
    }

    led->intensity = value;
    // Implement hardware-specific LED intensity setting
    setLEDIntensity(led, value);

    // Optionally turn on the LED if it's off
    if (led->state == OFF && value > 0) {
        led->state = ON;
        setLEDState(led, ON);
    }

    // Send acknowledgment response
    sendAckResponse(CMD_LED_INTENSITY, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 8, 3, 81, 0, 0, 10] // ACK for LED Intensity
        </code></pre>
      </td>
    </tr>
    
    <!-- LED Combined Update -->
    <tr>
      <td>9</td>
      <td>LED Combined Update</td>
      <td>LED ID</td>
      <td>Combination of state and intensity: (Intensity << 16) | State</td>
      <td>[9, 3, 81, 1, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>9:</strong> COMMAND_ID for LED Combined Update</li>
          <li><strong>3:</strong> HARDWARE_ID for LED 3</li>
          <li><strong>81, 1, 0, 0:</strong> VALUE = (81 << 16) | 1 = 0x00015101</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_LED_COMBINED_UPDATE 9

// Function to handle LED Combined Update Command
void handleLEDCombinedUpdate(uint8_t hardware_id, uint32_t value) {
    LED* led = getLEDById(hardware_id);
    if (led == NULL) {
        // Handle invalid LED ID
        sendErrorResponse(CMD_LED_COMBINED_UPDATE, hardware_id);
        return;
    }

    uint16_t intensity = (value >> 16) & 0xFFFF;
    uint8_t state = value & 0xFF;

    if (intensity > 100 || state > 1) {
        // Handle invalid intensity or state
        sendErrorResponse(CMD_LED_COMBINED_UPDATE, hardware_id);
        return;
    }

    led->intensity = intensity;
    led->state = (state == 1) ? ON : OFF;

    // Implement hardware-specific LED settings
    setLEDIntensity(led, intensity);
    setLEDState(led, led->state);

    // Send acknowledgment response
    sendAckResponse(CMD_LED_COMBINED_UPDATE, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 9, 3, 81, 1, 0, 10] // ACK for LED Combined Update
        </code></pre>
      </td>
    </tr>
    
    <!-- Motor Toggle State -->
    <tr>
      <td>10</td>
      <td>Toggle Motor State</td>
      <td>Motor ID</td>
      <td>0 = OFF, 1 = ON</td>
      <td>[10, 1, 1, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>10:</strong> COMMAND_ID for Motor Toggle State</li>
          <li><strong>1:</strong> HARDWARE_ID for Motor 1</li>
          <li><strong>1, 0, 0, 0:</strong> VALUE = 1 (Toggle to ON)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_MOTOR_TOGGLE_STATE 10

// Function to handle Motor Toggle State Command
void handleMotorToggleState(uint8_t hardware_id, uint32_t value) {
    Motor* motor = getMotorById(hardware_id);
    if (motor == NULL) {
        // Handle invalid Motor ID
        sendErrorResponse(CMD_MOTOR_TOGGLE_STATE, hardware_id);
        return;
    }

    if (value == 0) {
        motor->state = OFF;
        stopMotor(motor);
    } else if (value == 1) {
        motor->state = ON;
        startMotor(motor);
    } else {
        // Handle invalid value
        sendErrorResponse(CMD_MOTOR_TOGGLE_STATE, hardware_id);
        return;
    }

    // Send acknowledgment response
    sendAckResponse(CMD_MOTOR_TOGGLE_STATE, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 10, 1, 1, 0, 0, 10] // ACK for Motor Toggle State
        </code></pre>
      </td>
    </tr>
    
    <!-- Adjust Motor Speed -->
    <tr>
      <td>11</td>
      <td>Adjust Motor Speed</td>
      <td>Motor ID</td>
      <td>Speed in Hz (0-5000)</td>
      <td>[11, 1, 220, 5, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>11:</strong> COMMAND_ID for Adjust Motor Speed</li>
          <li><strong>1:</strong> HARDWARE_ID for Motor 1</li>
          <li><strong>220, 5, 0, 0:</strong> VALUE = 1500 (0x05DC)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_MOTOR_ADJUST_SPEED 11

// Function to handle Adjust Motor Speed Command
void handleMotorAdjustSpeed(uint8_t hardware_id, uint32_t value) {
    Motor* motor = getMotorById(hardware_id);
    if (motor == NULL) {
        // Handle invalid Motor ID
        sendErrorResponse(CMD_MOTOR_ADJUST_SPEED, hardware_id);
        return;
    }

    if (value > 5000) {
        // Handle invalid speed
        sendErrorResponse(CMD_MOTOR_ADJUST_SPEED, hardware_id);
        return;
    }

    motor->speed = value;
    // Implement hardware-specific speed adjustment
    setMotorSpeed(motor, value);

    // Send acknowledgment response
    sendAckResponse(CMD_MOTOR_ADJUST_SPEED, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 11, 1, 220, 5, 0, 10] // ACK for Adjust Motor Speed
        </code></pre>
      </td>
    </tr>
    
    <!-- Motor Toggle Direction -->
    <tr>
      <td>12</td>
      <td>Toggle Motor Direction</td>
      <td>Motor ID</td>
      <td>0 = CW (Clockwise), 1 = CCW (Counter-clockwise)</td>
      <td>[12, 1, 1, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>12:</strong> COMMAND_ID for Motor Toggle Direction</li>
          <li><strong>1:</strong> HARDWARE_ID for Motor 1</li>
          <li><strong>1, 0, 0, 0:</strong> VALUE = 1 (CCW)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_MOTOR_TOGGLE_DIRECTION 12

// Function to handle Motor Toggle Direction Command
void handleMotorToggleDirection(uint8_t hardware_id, uint32_t value) {
    Motor* motor = getMotorById(hardware_id);
    if (motor == NULL) {
        // Handle invalid Motor ID
        sendErrorResponse(CMD_MOTOR_TOGGLE_DIRECTION, hardware_id);
        return;
    }

    if (value == 0) {
        motor->direction = CW;
        setMotorDirectionCW(motor);
    } else if (value == 1) {
        motor->direction = CCW;
        setMotorDirectionCCW(motor);
    } else {
        // Handle invalid value
        sendErrorResponse(CMD_MOTOR_TOGGLE_DIRECTION, hardware_id);
        return;
    }

    // Send acknowledgment response
    sendAckResponse(CMD_MOTOR_TOGGLE_DIRECTION, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 12, 1, 1, 0, 0, 10] // ACK for Motor Toggle Direction
        </code></pre>
      </td>
    </tr>
    
    <!-- Reset Command (ASCII) -->
    <tr>
      <td>1 (0x01)</td>
      <td>Reset System</td>
      <td>0</td>
      <td>RESET command (ASCII)</td>
      <td>[1, 0, 0, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>1 (0x01):</strong> COMMAND_ID for Reset</li>
          <li><strong>0:</strong> HARDWARE_ID (Not used)</li>
          <li><strong>0, 0, 0, 0:</strong> VALUE = 0 (Not used)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_RESET 1

// Function to handle Reset Command
void handleReset(uint8_t hardware_id, uint32_t value) {
    // Reset all systems
    resetAllSystems();

    // Send acknowledgment response
    sendAckResponse(CMD_RESET, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 1, 0, 0, 0, 0, 10] // ACK for Reset
        </code></pre>
      </td>
    </tr>
    
    <!-- Production Mode Command (ASCII) -->
    <tr>
      <td>2 (0x02)</td>
      <td>Set Production Mode</td>
      <td>0</td>
      <td>PRODUCTION_MODE command (ASCII)</td>
      <td>[2, 0, 1, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>2 (0x02):</strong> COMMAND_ID for Production Mode</li>
          <li><strong>0:</strong> HARDWARE_ID (Not used)</li>
          <li><strong>1, 0, 0, 0:</strong> VALUE = 1 (Activate Production Mode)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_PRODUCTION_MODE 2

// Function to handle Production Mode Command
void handleProductionMode(uint8_t hardware_id, uint32_t value) {
    if (value == 1) {
        activateProductionMode();
    } else if (value == 0) {
        deactivateProductionMode();
    } else {
        // Handle invalid value
        sendErrorResponse(CMD_PRODUCTION_MODE, hardware_id);
        return;
    }

    // Send acknowledgment response
    sendAckResponse(CMD_PRODUCTION_MODE, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 2, 1, 0, 0, 0, 10] // ACK for Production Mode
        </code></pre>
      </td>
    </tr>
    
    <!-- Record Serial Command (ASCII) -->
    <tr>
      <td>4 (0x04)</td>
      <td>Record Serial</td>
      <td>0</td>
      <td>RECORD_SERIAL or STOP_RECORD_SERIAL command (ASCII)</td>
      <td>[4, 0, 1, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>4 (0x04):</strong> COMMAND_ID for Record Serial</li>
          <li><strong>0:</strong> HARDWARE_ID (Not used)</li>
          <li><strong>1, 0, 0, 0:</strong> VALUE = 1 (Start Recording)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_RECORD_SERIAL 4

// Function to handle Record Serial Command
void handleRecordSerial(uint8_t hardware_id, uint32_t value) {
    if (value == 1) {
        startSerialRecording();
    } else if (value == 0) {
        stopSerialRecording();
    } else {
        // Handle invalid value
        sendErrorResponse(CMD_RECORD_SERIAL, hardware_id);
        return;
    }

    // Send acknowledgment response
    sendAckResponse(CMD_RECORD_SERIAL, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 4, 1, 0, 0, 0, 10] // ACK for Record Serial
        </code></pre>
      </td>
    </tr>
    
    <!-- Light Barrier State -->
    <tr>
      <td>13</td>
      <td>Set Light Barrier State</td>
      <td>Light Barrier ID</td>
      <td>0 = Inactive, 1 = Active</td>
      <td>[13, 1, 1, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>13:</strong> COMMAND_ID for Light Barrier State</li>
          <li><strong>1:</strong> HARDWARE_ID for Light Barrier 1</li>
          <li><strong>1, 0, 0, 0:</strong> VALUE = 1 (Active)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Define constants
#define CMD_LIGHT_BARRIER_STATE 13

// Function to handle Light Barrier State Command
void handleLightBarrierState(uint8_t hardware_id, uint32_t value) {
    LightBarrier* lb = getLightBarrierById(hardware_id);
    if (lb == NULL) {
        // Handle invalid Light Barrier ID
        sendErrorResponse(CMD_LIGHT_BARRIER_STATE, hardware_id);
        return;
    }

    if (value == 0) {
        lb->state = INACTIVE;
        // Implement hardware-specific light barrier deactivation
        deactivateLightBarrier(lb);
    } else if (value == 1) {
        lb->state = ACTIVE;
        // Implement hardware-specific light barrier activation
        activateLightBarrier(lb);
    } else {
        // Handle invalid value
        sendErrorResponse(CMD_LIGHT_BARRIER_STATE, hardware_id);
        return;
    }

    // Send acknowledgment response
    sendAckResponse(CMD_LIGHT_BARRIER_STATE, hardware_id);
}
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Response Sent
[7, 13, 1, 0, 0, 0, 10] // ACK for Light Barrier State
        </code></pre>
      </td>
    </tr>
    
    <!-- Example Command: Change LED Intensity -->
    <tr>
      <td>8</td>
      <td>Set LED Intensity</td>
      <td>LED ID</td>
      <td>Intensity Level (0-100)</td>
      <td>[8, 2, 81, 0, 0, 0, 10]</td>
      <td>
        <ul>
          <li><strong>8:</strong> COMMAND_ID for LED Intensity</li>
          <li><strong>2:</strong> HARDWARE_ID for LED 2</li>
          <li><strong>81, 0, 0, 0:</strong> VALUE = 81 (0x51)</li>
          <li><strong>10:</strong> END_CHAR (Newline)</li>
        </ul>
      </td>
      <td>
        <pre><code>
// Example: Change intensity of LED 2 to 81% and update
handleLEDIntensity(2, 81);
        </code></pre>
      </td>
      <td>
        <pre><code>
// Example Log Messages Generated
[15:51:00] Logs cleared.
[15:51:02] Changing intensity of LED 2 to 81%...
[15:51:02] Command Sent: [8, 2, 81, 0, 0, 0, 10]
[15:51:02] LED 2 updated to ON with intensity 81%
[15:51:02] Intensity of LED 2 set to 81%.
[15:51:02] Serial event listeners set up successfully (binary).
        </code></pre>
      </td>
    </tr>
    
    <!-- Additional Commands -->
    <!-- Add more rows here for any additional commands -->
  </tbody>
</table>




















