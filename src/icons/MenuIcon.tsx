import React from 'react';

const MenuIcon: React.FunctionComponent<{ color?: string; size?: number }> = ({ color, size }) => (
    <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill={color} d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
);

MenuIcon.defaultProps = {
    size: 24,
    color: 'white',
};

export default MenuIcon;
