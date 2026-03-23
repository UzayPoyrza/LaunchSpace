import React from 'react';
import './WeatherPrivacy.css';

function WeatherPrivacy() {
  return (
    <div className="weather-privacy-page">
      <div className="weather-privacy-container">
        <h1>Privacy Policy — Weather Time Widget</h1>
        <p className="last-updated">Last Updated: March 24, 2026</p>

        <section>
          <h2>1. Overview</h2>
          <p>
            Weather Time Widget ("the App") is a weather and time widget application for iOS.
            This Privacy Policy explains how we collect, use, and protect your information.
          </p>
        </section>

        <section>
          <h2>2. Data We Collect</h2>
          <p>The App collects the following data:</p>
          <p>
            <strong>Location Data:</strong> Your device's current location is used solely to provide
            accurate weather information for your area. Location data is processed on-device and is
            not stored on any external server by us.
          </p>
        </section>

        <section>
          <h2>3. How We Use Your Data</h2>
          <p>Your location data is used exclusively to:</p>
          <ul>
            <li>Retrieve current weather conditions and forecasts for your location</li>
            <li>Display relevant weather information in the widget</li>
          </ul>
        </section>

        <section>
          <h2>4. Third-Party Services</h2>
          <p>The App uses the following third-party services to fetch weather data:</p>
          <ul>
            <li><strong>Open-Meteo API</strong> (open-meteo.com) — for global weather data</li>
            <li><strong>MGM</strong> (Turkish State Meteorological Service) — for weather data within Turkey</li>
          </ul>
          <p>
            Your approximate location coordinates are sent to these services to retrieve weather
            information. Please refer to their respective privacy policies for more details.
          </p>
        </section>

        <section>
          <h2>5. Data Storage</h2>
          <ul>
            <li>Weather data is cached locally on your device for offline access</li>
            <li>No personal data is transmitted to or stored on our servers</li>
            <li>We do not have servers or databases that store user information</li>
          </ul>
        </section>

        <section>
          <h2>6. Data Sharing</h2>
          <p>
            We do not sell, trade, or share your personal information with third parties, except as
            described in Section 4 for the sole purpose of providing weather data.
          </p>
        </section>

        <section>
          <h2>7. Children's Privacy</h2>
          <p>
            The App does not knowingly collect personal information from children under 13. The App
            is rated 4+ and is safe for all ages.
          </p>
        </section>

        <section>
          <h2>8. Your Rights</h2>
          <p>
            You can revoke location access at any time through your device's Settings. The App will
            continue to function with manually selected locations.
          </p>
        </section>

        <section>
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be reflected by the
            "Last Updated" date above.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            <a href="mailto:contact@launchspace.org">contact@launchspace.org</a>
          </p>
        </section>
      </div>
    </div>
  );
}

export default WeatherPrivacy;
