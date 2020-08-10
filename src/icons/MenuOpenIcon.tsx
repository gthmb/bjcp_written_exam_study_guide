import React from 'react';

const MenuIcon: React.FunctionComponent<{ color?: string; size?: number }> = ({ color, size }) => (
    <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
            fill={color}
            d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"
        />
    </svg>
);

MenuIcon.defaultProps = {
    size: 24,
    color: 'white',
};

export default MenuIcon;
