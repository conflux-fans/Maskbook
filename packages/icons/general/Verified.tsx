import { createIcon } from '../utils'
import type { SvgIcon } from '@mui/material'

export const VerifiedIcon: typeof SvgIcon = createIcon(
    'VerifiedIcon',
    <g>
        <g clipPath="url(#a)">
            <path
                d="M15.782 5.912V3.851l-1.79-1.033-1.028-1.785h-2.061L9.113 0 7.33 1.033H5.268L4.234 2.818 2.444 3.85v2.061L1.418 7.697 2.45 9.48v2.061l1.79 1.029 1.033 1.789h2.061l1.784 1.028 1.79-1.028h2.056l1.028-1.79 1.79-1.028V9.481l1.028-1.784-1.028-1.785Z"
                fill="#60DFAB"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.549 5.85a.5.5 0 0 1 0 .708L7.97 11.135a.5.5 0 0 1-.707 0l-2.14-2.14a.5.5 0 0 1 .707-.707l1.786 1.786 4.224-4.223a.5.5 0 0 1 .708 0Z"
                fill="#fff"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" transform="translate(.75)" d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </g>,
    '0 0 16 16',
)
