/* eslint-disable import/no-named-as-default-member */
import neo4j from 'neo4j-driver'
import type { Driver } from 'neo4j-driver'

let driver: Driver

const defaultOptions = {
  uri: process.env.NEO4J_URI,
  username: process.env.NEO4J_USER,
  password: process.env.NEO4J_PASSWORD,
}

export default function getDriver() {
  const { uri, username, password } = defaultOptions
  if (!driver) {
    // For more info see: https://github.com/neo4j/neo4j-javascript-driver/#numbers-and-the-integer-type
    driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
  }

  return driver
}
