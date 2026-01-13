import { fakerRU as faker } from "@faker-js/faker"

const generateUsers = () => {
  return Array.from({ length: 30 }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const createdAt = faker.date.past()
    const lastLoginAt = faker.date.between({ from: createdAt, to: new Date() })
    return {
      id: faker.string.uuid(),
      firstName,
      lastName,
      email: faker.internet.email({ firstName }).toLocaleLowerCase(),
      phoneNumber: faker.phone.number({ style: "international" }),
      status: faker.helpers.arrayElement([
        "активные",
        "не_активные",
        "приглашенные",
        "оплата_не_прошла",
      ]),
      role: faker.helpers.arrayElement([
        "superadmin",
        "admin",
        "cashier",
        "manager",
      ]),
      createdAt,
      lastLoginAt,
      updatedAt: faker.date.recent(),
    }
  })
}

let users = null

export const getUsers = () => {
  if (!users) {
    users = generateUsers() // Generate data once
  }
  return users
}
