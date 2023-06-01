import Image from 'next/image';
import React, { FC } from 'react'

interface LogoProps {
  className?: string;
  width?: number;
  height?: number|string;
}

const Logo:FC<LogoProps> = ({ className = '', width, height }) => {
  return (
    <div className={`${className}`}>
      <Image style={{ width: width ?? '147px', height: height ?? '48px' }} src={'/logo.png'} alt='logo' width={147} height={48} />
    </div>
  )
}

export default Logo
