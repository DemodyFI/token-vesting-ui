import React from "react";
import { faGithub, faTwitter, faTelegram, faMedium } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../stylesheets/Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-left">© 2020 Demodyfi • Made with <span style={{ color: '#ff9a36'}}>Open Zeppelin </span></div>
      <div className="footer-right">
        <div
          className="footer-icon"
          onClick={(e) =>
            window.open("https://github.com/DemodyFI", "_blank", "noopener noreferrer")
          }
        >
          <FontAwesomeIcon icon={faGithub} />
        </div>
        <div
          className="footer-icon"
          onClick={(e) =>
            window.open("https://twitter.com/DemodyFi", "_blank", "noopener noreferrer")
          }
        >
          <FontAwesomeIcon icon={faTwitter} />
        </div>
        <div
          className="footer-icon"
          onClick={(e) =>
            window.open("https://t.me/DemodyFI", "_blank", "noopener noreferrer")
          }
        >
          <FontAwesomeIcon icon={faTelegram} />
        </div>
        <div
          className="footer-icon"
          onClick={(e) =>
            window.open("https://demodyfi.medium.com/", "_blank", "noopener noreferrer")
          }
        >
          <FontAwesomeIcon icon={faMedium} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
