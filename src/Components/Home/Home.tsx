import React from "react";
import { LatestTransactions } from "./LatestTransactions";
import { Wallets } from "./Wallets";

export const Home = () => {
    return <div>
        <Wallets />
        <LatestTransactions />
    </div>
}