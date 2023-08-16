import React from "react";
import {Button} from "react-bootstrap";

const LanguageButton = ({ locale, user }) => {
    const buttonText = getLanguageButtonText(locale);

    return (
        <Button
            variant="outline-danger"
            className="m-lg-1"
            onClick={() => {
                user.setFaker(locale);
            }}
        >
            {buttonText}
        </Button>
    );
};

const getLanguageButtonText = (locale) => {
    switch (locale) {
        case 'en':
            return 'English';
        case 'de':
            return 'Deutschland';
        case 'ru':
            return 'Russian';
        default:
            return '';
    }
};

export default LanguageButton;





