import React from "react";
import { Button } from "app/frontend/reusable-components/button/button";
import { Card } from "app/frontend/reusable-components/card/card";

export default function GettingStarted() {
    return (
        <Card maxWidth='max-w-[500px]'>
            <div className="flex items-center justify-center">
                    <img className=" w-12 h-12" src='Wealthfront_Logo.png'/>
                </div>
                <h1 className=" my-4 text-3xl font-bold text-center">Wealthfront</h1>
            <Button fullwidth href="/create-account">
                Get started
            </Button>
        </Card>
    )
}