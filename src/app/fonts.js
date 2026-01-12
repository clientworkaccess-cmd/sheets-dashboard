import localFont from 'next/font/local'

export const gillSans = localFont({
  src: [
    { path: '../public/fonts/GillSans-01.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/GillSans-Italic-03.ttf', weight: '400', style: 'italic' },

    { path: '../public/fonts/GillSans-Light-08.ttf', weight: '300', style: 'normal' },
    { path: '../public/fonts/GillSans-LightItalic-09.ttf', weight: '300', style: 'italic' },

    { path: '../public/fonts/GillSans-SemiBold-05.ttf', weight: '600', style: 'normal' },
    { path: '../public/fonts/GillSans-SemiBoldItalic-06.ttf', weight: '600', style: 'italic' },

    { path: '../public/fonts/GillSans-Bold-02.ttf', weight: '700', style: 'normal' },
    { path: '../public/fonts/GillSans-BoldItalic-04.ttf', weight: '700', style: 'italic' },

    { path: '../public/fonts/GillSans-UltraBold-07.ttf', weight: '800', style: 'normal' },
  ],
  display: 'swap',
})
