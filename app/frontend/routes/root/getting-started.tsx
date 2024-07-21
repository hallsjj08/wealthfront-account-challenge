import React from "react";
import { Button } from "app/frontend/reusable-components/button/button";
import { Card } from "app/frontend/reusable-components/card/card";

export default function GettingStarted() {
    return (
        <Card title="Wealthfront">
            <Button href="/create-account">
                Get started
            </Button>
        </Card>
    )
}