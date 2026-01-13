import { fakerRU as faker } from "@faker-js/faker"
import { products } from "../../products/data/products"
import { calculateSubscriberStatus } from "./utils"

const productList = products.map((p) => ({ id: p.id, name: p.name }))

const generateSubscribers = () => {
  return Array.from({ length: 30 }, () => {
    const type = faker.helpers.arrayElement(["legal", "individual"])
    const createdAt = faker.date.past()
    const lastLoginAt = faker.date.between({ from: createdAt, to: new Date() })
    
    // Генерируем от 1 до 3 продуктов для каждого подписчика
    const productsCount = faker.number.int({ min: 1, max: 3 })
    const selectedProducts = faker.helpers.arrayElements(productList, productsCount)
    
    const subscriberProducts = selectedProducts.map((product) => {
      const subscribedAt = faker.date.between({ from: createdAt, to: new Date() })
      // Определяем статус оплаты продукта
      const paymentStatus = faker.helpers.arrayElement([
        "оплачено",
        "ожидает оплаты",
        "оплата не прошла",
        "не активный",
        "приглашенные",
      ])
      // Для продуктов со статусом "оплачено" генерируем дату оплаты
      const paymentDate =
        paymentStatus === "оплачено"
          ? faker.date.between({ from: subscribedAt, to: new Date() })
          : undefined
      
      return {
        productId: product.id,
        productName: product.name,
        subscribedAt,
        paymentDate,
        paymentStatus,
      }
    })
    
    // Вычисляем статус подписчика на основе статусов продуктов
    const calculatedStatus = calculateSubscriberStatus(subscriberProducts)
    
    // Общие поля
    const baseFields = {
      id: faker.string.uuid(),
      status: calculatedStatus,
      products: subscriberProducts,
      createdAt,
      lastLoginAt,
      updatedAt: faker.date.recent(),
    }
    
    // Генерируем данные в зависимости от типа
    if (type === "legal") {
      // Юридическое лицо
      const companyName = faker.company.name()
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      
      return {
        ...baseFields,
        type: "legal",
        companyName,
        inn: faker.string.numeric(10),
        kpp: faker.helpers.maybe(() => faker.string.numeric(9), { probability: 0.8 }),
        ogrn: faker.helpers.maybe(() => faker.string.numeric(13), { probability: 0.7 }),
        legalAddress: faker.location.streetAddress({ useFullAddress: true }),
        bankAccount: faker.helpers.maybe(() => faker.string.numeric(20), { probability: 0.7 }),
        bankName: faker.helpers.maybe(() => faker.company.name() + " банк", { probability: 0.7 }),
        bik: faker.helpers.maybe(() => faker.string.numeric(9), { probability: 0.7 }),
        contactPerson: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName: companyName }).toLocaleLowerCase(),
        phoneNumber: faker.phone.number({ style: "international" }),
      }
    } else {
      // Физическое лицо
      const firstName = faker.person.firstName()
      const lastName = faker.person.lastName()
      // Генерируем отчество из мужского имени с добавлением суффикса
      const middleName = faker.helpers.maybe(() => {
        const maleName = faker.person.firstName("male")
        // Добавляем суффиксы для отчества
        const suffixes = ["ович", "евич", "ич"]
        return maleName + faker.helpers.arrayElement(suffixes)
      }, { probability: 0.7 })
      
      return {
        ...baseFields,
        type: "individual",
        firstName,
        lastName,
        middleName,
        email: faker.internet.email({ firstName, lastName }).toLocaleLowerCase(),
        phoneNumber: faker.phone.number({ style: "international" }),
      }
    }
  })
}

let subscribers = null

export const getSubscribers = () => {
  if (!subscribers) {
    subscribers = generateSubscribers() // Generate data once
  }
  return subscribers
}

