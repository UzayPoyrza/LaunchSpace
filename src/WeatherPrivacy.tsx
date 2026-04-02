import React from 'react';

function WeatherPrivacy() {
  return (
    <div className="nitro-subpage">
      <div className="nitro-subpage__header">
        <h1 className="nitro-subpage__title" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>privacy policy</h1>
        <p className="nitro-subpage__desc" style={{ fontSize: 'clamp(16px, 2vw, 20px)' }}>
          Weather Time Widget — Last Updated: March 24, 2026
        </p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Section title="1. Overview">
          <p>
            Weather Time Widget ("the App") is a weather and time widget application for iOS.
            This Privacy Policy explains how we collect, use, and protect your information.
          </p>
        </Section>

        <Section title="2. Data We Collect">
          <p>The App collects the following data:</p>
          <p>
            <strong>Location Data:</strong> Your device's current location is used solely to provide
            accurate weather information for your area. Location data is processed on-device and is
            not stored on any external server by us.
          </p>
        </Section>

        <Section title="3. How We Use Your Data">
          <p>Your location data is used exclusively to:</p>
          <ul>
            <li>Retrieve current weather conditions and forecasts for your location</li>
            <li>Display relevant weather information in the widget</li>
          </ul>
        </Section>

        <Section title="4. Third-Party Services">
          <p>The App uses the following third-party services to fetch weather data:</p>
          <ul>
            <li><strong>Open-Meteo API</strong> (open-meteo.com) — for global weather data</li>
            <li><strong>MGM</strong> (Turkish State Meteorological Service) — for weather data within Turkey</li>
          </ul>
          <p>
            Your approximate location coordinates are sent to these services to retrieve weather
            information. Please refer to their respective privacy policies for more details.
          </p>
        </Section>

        <Section title="5. Data Storage">
          <ul>
            <li>Weather data is cached locally on your device for offline access</li>
            <li>No personal data is transmitted to or stored on our servers</li>
            <li>We do not have servers or databases that store user information</li>
          </ul>
        </Section>

        <Section title="6. Data Sharing">
          <p>
            We do not sell, trade, or share your personal information with third parties, except as
            described in Section 4 for the sole purpose of providing weather data.
          </p>
        </Section>

        <Section title="7. Children's Privacy">
          <p>
            The App does not knowingly collect personal information from children under 13. The App
            is rated 4+ and is safe for all ages.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <p>
            You can revoke location access at any time through your device's Settings. The App will
            continue to function with manually selected locations.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be reflected by the
            "Last Updated" date above.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            If you have questions about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:contact@launchspace.org" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              contact@launchspace.org
            </a>
          </p>
        </Section>
      </div>
    </div>
  );
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: 32 }}>
    <div className="nitro-label-row" style={{ marginBottom: 16 }}>
      <span className="nitro-label">.{title.toLowerCase()}</span>
      <div className="nitro-label-line" />
    </div>
    <div className="nitro-privacy-body">
      {children}
    </div>
  </div>
);

export default WeatherPrivacy;
