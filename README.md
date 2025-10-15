# ClipShare

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) <!-- Example Badge -->

ClipShare is a simple yet effective web application designed to facilitate seamless sharing of text-based clipboard content across different devices. By leveraging cloud storage and QR code technology, ClipShare provides a quick and convenient way to transfer snippets of text without the need for email, messaging apps, or physical cables.

## Features

*   **Save Content:** Easily save text from your clipboard to a unique cloud-hosted ID.
*   **Retrieve Content:** Access saved content on any device by entering the unique ID or scanning a generated QR code.
*   **QR Code Generation:** Instantly generate QR codes for saved content IDs, simplifying retrieval on mobile devices.
*   **QR Code Scanning:** Utilize your device's camera to scan ClipShare QR codes and automatically retrieve content.
*   **Theme Customization:** Switch between Light and Dark themes for a personalized user experience.

## Technologies Used

*   **Frontend:**
    *   React
    *   TypeScript
    *   Tailwind CSS
    *   Vite (Build Tool)
*   **Backend/Database:**
    *   Firebase (Firestore)
*   **Libraries:**
    *   `html5-qrcode` (for QR scanning)
    *   `react-qr-code` (for QR generation)

## Installation

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Solved-Overnight/ClipShare.git;
    cd clipshare
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Firebase:**
    *   Create a new project in the [Firebase console](https://console.firebase.google.com/).
    *   Set up a Firestore database.
    *   Obtain your Firebase configuration details.
    *   Create a `.env` file in the project root directory and add your Firebase configuration variables:
        ```env
        VITE_FIREBASE_API_KEY=YOUR_API_KEY
        VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
        VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
        VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
        VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
        VITE_FIREBASE_APP_ID=YOUR_APP_ID
        VITE_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
        ```

## Usage

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
2.  Open your web browser and navigate to the address provided by Vite (typically `http://localhost:5173`).
3.  Use the "Save" tab to input text and generate a unique ID and QR code.
4.  Use the "Retrieve" tab to enter an ID or scan a QR code to fetch saved content.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) (Optional)

Project Link: [https://github.com/your_username/clipshare](https://github.com/your_username/clipshare) (Replace with actual link)
