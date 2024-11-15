"use client";

import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function JsonData({ data }: { data: any }) {
  return (
    <pre>
      <code>
        {JSON.stringify(data, null, 2)}
      </code>
    </pre>
  )
}
