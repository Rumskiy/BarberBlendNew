"use client";

import styles from './Skeleton.module.scss'
import React from "react";

interface SkeletonProps {
    style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({style}) => {
    return (
        <div style={style} className={styles.skeleton}>

        </div>
    );
};