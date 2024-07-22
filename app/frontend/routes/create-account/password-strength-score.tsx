import React from "react";

interface PasswordScoreProps {
    score: number
}

export default function PasswordStrengthScore({score}: PasswordScoreProps) {

    let color = 'bg-gray-200'
    let label = "Strength"
    let width = "w-full"

    console.log(score)
    switch (score) {
        case 0:
        case 1:
            color = 'bg-red-500'
            label = "Weak"
            width = 'w-1/3'
            break;
        case 2:
        case 3:
            color = 'bg-yellow-500'
            label = 'Good'
            width = 'w-2/3'
            break;
        case 4:
            color = 'bg-green-500'
            label = 'Strong'
            width = 'w-full'
            break;
    }

    return (
        <div className="w-full">
        <div className="flex w-full mt-1">
            <span className={`h-1 rounded ${color} ${width}`}></span>
        </div>
        <p className="text-right mt-0 text-xs text-gray-400">{label}</p>
        </div>
    )
}