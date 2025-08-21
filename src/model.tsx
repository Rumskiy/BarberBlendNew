export interface UserInfo {
    id: string,
    name?: string,
    last_name?: string,
    middle_name?: string,
    email?: string,
    phone_number: string,
    is_two_factor?: boolean,
    phone_verified_at?: string,
    role?: string,
    image?: string,
    password?: string,
    password_confirmation?: string,
}

export interface html {
    html: string;
}

export interface Pagination {
    current_page: number;
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    per_page: number;
    from: number;
    to: number;
    total: number;
}

// Тип для зображення
export interface Image {
    id: number;
    link: string;
    model_id: number;
}

export interface ProductGift {
    id: number,
    name: string,
    images: Image[],
    slug: string,
}

// Тип для категорії
interface ProductCategory {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    content: string | null; // Може бути HTML або просто текст, або null
    image: string | null;   // URL зображення або null
    sub_category?: SubCategory[]; // додано
    price: {
        min: string;
        max: string;
    },
}

export interface ProductTag {
    id: number; // Припускаємо, що тег теж має ID
    name: string;
}

export interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    total_price: string;
    current_cost: string;
    discount_cost: string;
    product: BaseProduct;
}

export interface CartData {
    id: number;
    user_id: number | null;
    cost: string;
    is_free_delivery: boolean;
    items: CartItem[];
    gift: ProductGift[];
    product_gift: any[];
    order_gift: ProductData[];
    possible_gifts: any[];
}

export interface CartActionPayload {
    product_id: number;
    quantity?: number; // Опціонально для видалення
    guest_token: string;
}

export interface AddToCartPayload {
    product_id: number;
    quantity: number;
    guest_token: string;
}

export interface CartApiResponse {
    status: boolean;
    data: CartData;
    message?: string;
}

export interface BaseProduct {
    id: number;
    name: string;
    article: string;
    price: string; // Ціна як рядок, можливо, варто конвертувати в number при обробці
    description: string | null; // HTML рядок
    how_work: string | null;
    effect: string | null; // HTML рядок
    composition: string | null; // HTML рядок
    using: string | null;
    volume: string; // Об'єм як рядок, можливо, варто конвертувати в number
    active: boolean;
    slug: string; // Може бути null, як у деяких other_sizes/other_properties
    unit: string;
    is_discount: boolean;
    discount_price: string | null; // Ціна зі знижкою як рядок або null
    discount_description: string | null;
    tags: ProductTag[];
    categories: ProductCategory[];
    images: Image[];
    video: string | null; // URL відео або null
    is_favourite: boolean;
    product_gift: ProductGift | null; // Тип для подарунка, якщо відомий, можна уточнити. Поки що any.
    meta_desc: string | null;
    meta_slug: string | null;
    meta_title: string | null;
}

export interface ProductFilter {
    category_ids?: number[];
    under_category_ids?: number[];
    tags_ids?: number[];
    price_from?: number;
    price_to?: number;
    sort_by?: 'created_at' | 'price' | 'alphabet' | 'popularity'; // Або інші значення
    is_discount?: boolean;
    has_gift?: boolean;
    is_hit_sale?: boolean;
    is_new?: boolean;
}

// Main Api models
export type ProductVariant = BaseProduct;

export interface FavoriteItem {
    product: ProductData
}


export interface ProductData extends BaseProduct {
    // Розширюємо від BaseProduct
    similarProducts: ProductData[];
    other_sizes: ProductVariant[];
    other_properties: ProductVariant[]; // "other_properties" має таку ж структуру, як "other_sizes"
}

export interface LandingBannerCategory {
    id: number;
    name: string;
    slug: string;
    image: Image;
}

export interface SubCategory {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    content: string | null;
    meta_desc: string | null;
    meta_slug: string | null;
    meta_title: string | null;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    content: string | null;
    meta_desc: string | null;
    meta_slug: string | null;
    meta_title: string | null;
    sub_category: SubCategory[];
    image: string | null;
    price: {
        min: string;
        max: string;
    },
}

export interface Banners {
    id: number;
    name: string;
    url: string;
    image: Image;
    mobile_image: Image | null;
}

export interface InstagramBanners {
    id: number;
    name: string;
    url: string;
    image: Image[];
    mobile_image: Image[] | null;
}

export interface SiteBanners {
    desc: string;
    title: string;
}

export interface Blog {
    id: number;
    title: string;
    publisher: string;
    // @ts-ignore
    content: html[];
    image: Image[];
    wide_format: Image[];
    slug: string;
    created_at: string
}

export interface UserToken {
    message?: string;
    token: string;
}

// Інтерфейс для вхідних даних логіну
export interface LoginFormInputs {
    phone_number: string;
    password: string;
    token?: string;
    code?: string;
}

export interface UserInfoApi {
    data: UserInfo;
    status: boolean;
}

// Інтерфейс для вхідних даних логіну
export interface LoginFormInputsApi {
    phone_number: string;
    password: string;
    token?: string;
    code: string;
}

// 0966439502
//form register user
export interface RegisterFormInputs {
    name: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
}

//Register code from
export interface RegisterFormCode {
    name?: string;
    phone_number: string;
    password: string;
    code: string;
    token?: string;
}

// Інтерфейс для типу контексту
export interface AuthContextType {
    user: UserToken | null;
    isLoading: boolean; // Чи йде початкове завантаження (відновлення сесії з localStorage)
    login: (userData: UserToken) => void;
    logout: () => void;
}

// Відповідь API
export interface GetLikeApiResponse {
    status: boolean;
    data: ProductData[]; // Масив об'єктів FavoriteItem
    message?: string;
}

export interface CategoriesApiResponse {
    status: boolean;
    data: Category[];
}

// Інтерфейс для відповіді API після успішного логіну
export interface LoginApiResponse {
    status?: boolean;
    token?: string;
    message?: string;
    user?: {
        id: string;
        firstName?: string;
        phone_number: string;
        email?: string;
    };
}

export interface CategorySingleApiResponse {
    status: boolean;
    data: Category;
}

//For ProductPage
export interface ProductPageApiResponse {
    status: boolean;
    data: ProductData;
    pagination?: Pagination;
}

//
export interface ProductTagApiResponse {
    status: boolean;
    data: ProductTag[];
}

//Array for swipers and other
export interface ProductApiResponse {
    status: boolean;
    data: ProductData[];
    pagination?: Pagination;
    message?: string;
    prices?: { max_price: string; min_price: string };
}

export interface BlogApiResponse {
    status: boolean;
    data: Blog[];
}

export interface BlogSingleApiResponse {
    status: boolean;
    data: Blog;
}

export interface LandingDataApiResponse {
    status: boolean;
    banners: Banners[];
    category: LandingBannerCategory[];
    more_offers: [];
    instagramBanners: []
    blog: Blog[];
    under_text: {
        title: string;
        desc: string;
    }
}

export interface DeliveryType {
    id: number;
    name: string; // Назва для відображення (наприклад, "Нова пошта відділення")
    delivery_type: {
        key: string; // Ключ типу доставки (NEW_POST_DEPARTMENT, NEW_POST_COURIER, UKRAINIAN_POST)
        value: string;
    };
    delivery_payment_types: { // Можливі способи оплати для цього типу доставки
        key: string;
        value: string;
    }[];
    is_active: boolean;
    image: string | null;
}

export interface DeliveryTypeApiResponse {
    status: boolean;
    data: DeliveryType[];
    message?: string
}

// Інтерфейси для Нової Пошти
export interface NovaPoshtaCity {
    id: number; // Ваш ID міста
    name: string; // Назва міста
    city_ref: string; // Ref міста від Нової Пошти (може знадобитися для деяких API)
    message?: string
}

export interface NovaPoshtaCityApiResponse {
    status: boolean;
    data: NovaPoshtaCity[];
    message?: string
}

export interface NovaPoshtaWarehouse {
    id: number; // Ваш ID відділення/поштомата
    name: string; // Повна назва/адреса
    ref: string; // Ref відділення/поштомата від Нової Пошти
    number: number; // Номер відділення
    city_id: number; // Ваш ID міста
    message?: string
}

export interface NovaPoshtaWarehouseApiResponse {
    status: boolean;
    data: NovaPoshtaWarehouse[];
    message?: string
}

// Model for checkoutInputs
export interface CheckoutFormInputs {
    // Базові контакти
    name: string;
    last_name: string;
    middle_name: string;
    email: string;
    phone_number: string;

    // Спосіб доставки
    delivery_type_id: number | null;

    // Поля для НОВОЇ ПОШТИ
    np_city_name?: string;
    np_city_id?: number | null;
    np_warehouse_name?: string;
    np_warehouse_id?: number | null;

    np_courier_region?: string;
    np_courier_street?: string;
    np_courier_house?: string;
    np_courier_flat?: string | null;

    // Поля для УКРПОШТИ
    up_region?: string;
    up_city?: string;
    up_index?: string;
    up_address?: string;

    // Додаткові поля
    payment_type_value: string | null;
    comment?: string | null;
}

export interface FastCheckoutStep1Inputs {
    guest_token?: string;
    name: string;
    phone_number: string;
}

// Інтерфейс для елемента кошика всередині замовлення (схожий на CartItem, але може відрізнятися)
export interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    total_price: string;
    order_gift: ProductData[];
    current_cost: string;
    discount_cost?: string; // Може бути опціональним
    product: BaseProduct; // Використовуємо BaseProduct, якщо це достатньо
    // або ProductData, якщо потрібні other_sizes/other_properties
}

// Інтерфейс для подарунка в замовленні (схожий на ProductGift, але може відрізнятися)
export interface OrderProductGift {
    id: number;
    gift_id: number | null;
    product_id: number;
    price: string;
    // Додайте інші поля, які повертає API для product_gift у замовленні
    // наприклад, name, images, slug, як у вашому ProductGift
    name?: string;
    images?: Image[];
    slug?: string;
}

// Інтерфейс для інформації про місто Нової Пошти в замовленні
export interface OrderNovaPoshtaCity {
    id: number;
    name: string;
    city_ref: string;
}

// Інтерфейс для інформації про відділення/поштомат Нової Пошти в замовленні
export interface OrderNovaPoshtaWarehouse {
    id: number;
    name: string;
    // Додайте інші поля, які повертає API, наприклад ref, number
    ref?: string;
    number?: number;
}

// Інтерфейс для інформації про доставку Новою Поштою (кур'єр)
export interface OrderNovaPoshtaCourierDetails {
    street?: string | null;
    house_number?: string | null; // 'house' у вашому payload стало 'house_number'
    flat_number?: string | null;  // 'flat' у вашому payload стало 'flat_number'
    region?: string | null;      // 'region' з вашого payload
}

// Інтерфейс для інформації про доставку Укрпоштою
export interface OrderUkrPostDetails {
    ukr_post_city: string | null; // ВИПРАВЛЕНО: 'urk' -> 'ukr'
    ukr_post_index: string | null;
    ukr_post_address?: string | null; // Можливо, тут повна адреса
    ukr_post_region?: string | null;  // Можливо, регіон
}


// Інтерфейс для ключа/значення (використовується для delivery_type, payment_status, status)
export interface KeyValuePair {
    key: string;
    value: string;
}

// ОСНОВНИЙ ІНТЕРФЕЙС ДЛЯ ЗАМОВЛЕННЯ
export interface OrderData {
    id: number;
    created_at: string; // Дата у форматі рядка
    total_cost: string;
    current_cost: string;
    discount_cost: string;

    name: string; // Ім'я покупця (з payload.last_name)
    last_name: string; // Прізвище покупця (з payload.name)
    middle_name: string | null;
    email: string;
    phone: string; // Очищений номер телефону

    delivery_type: DeliveryType;
    delivery_payment_type: KeyValuePair; // Тип {key: string, value: string}

    comment: string | null;

    items: OrderItem[];
    gift_items: any[]; // Якщо структура відома, замініть any
    product_gift: OrderProductGift[] | null; // Може бути масивом або null

    payment_status: KeyValuePair;
    status: KeyValuePair;

    // Поля доставки, залежно від типу
    city?: OrderNovaPoshtaCity | null; // Для НП відділення/поштомат/кур'єр
    department?: OrderNovaPoshtaWarehouse | null; // Для НП відділення
    postmate?: OrderNovaPoshtaWarehouse | null; // Для НП поштомат

    // new_post?: OrderNovaPoshtaCourierDetails | null; // Або окремі поля, як у вашому payload
    street?: string | null;       // Для кур'єра НП
    house_number?: string | null; // Для кур'єра НП
    flat_number?: string | null;  // Для кур'єра НП
    region?: string | null;       // Для кур'єра НП (якщо є)

    // Для Укрпошти (з вашого payload)
    ukr_post_index?: string | null;
    ukr_post_city?: string | null; // Виправив urk_post_city на ukr_post_city для консистентності
    ukr_post_address?: string | null; // Якщо API повертає
    ukr_post_region?: string | null;  // Якщо API повертає

    imprest_payed?: string; // Опціонально, якщо не завжди є
    // user_id може бути тут, якщо замовлення прив'язане до користувача
    user_id?: number | null;
}

// Інтерфейс для відповіді API, що містить список замовлень (наприклад, історія замовлень)
export interface OrderListApiResponse {
    status: boolean;
    data: OrderData[];
    pagination?: Pagination; // Якщо є пагінація
    message?: string;
}

// Інтерфейс для відповіді API, що містить одне замовлення (наприклад, після створення)
export interface SingleOrderApiResponse {
    status: boolean;
    data: OrderData; // Одне замовлення
    message?: string;
}

interface PortmonePaymentTypeDetails {
    card: "Y" | "N";
    portmone: "Y" | "N";
    token: "Y" | "N";
    clicktopay: "Y" | "N";
    createtokenonly: "Y" | "N";
}

interface PortmoneStyleDetails {
    type: string;
    logo: string;
    backgroundColorHeader: string;
    backgroundColorButtons: string;
    colorTextAndIcons: string;
    bcMain?: string; // Опціональні, якщо можуть бути відсутні
    borderColorList?: string;
    logoHeight?: string;
    logoWidth?: string;
}

interface PortmonePayeeDetails {
    payeeId: string;
    login: string;
    dt: string; // Дата у форматі YYYYMMDDHHMMSS
    shopSiteId: string;
    signature: string; // Дуже важливе поле для Portmone
}

// Інтерфейс для payment_data, який приходить від вашого API
export interface PortmonePaymentData {
    billAmount: string;
    description: string;
    encoding: string;
    expTime: string; // Час життя запиту в секундах (наприклад, "200")
    failureUrl: string;
    shopOrderNumber: number | string; // ID вашого замовлення
    successUrl: string;
    payee: PortmonePayeeDetails;
    paymentTypes: PortmonePaymentTypeDetails;
    priorityPaymentTypes?: PortmonePaymentTypeDetails; // Може бути опціональним
    style?: PortmoneStyleDetails; // Може бути опціональним
    // Додайте будь-які інші поля, які є в payment_data
}

// Інтерфейс для відповіді вашого API, коли є онлайн-оплата
export interface OrderApiResponseWithOnlinePayment {
    status: boolean;
    is_online_payment: true; // Явно вказуємо, що це для онлайн-оплати
    data: any; // Об'єкт замовлення (можливо, ваш OrderData)
    payment_data: PortmonePaymentData; // Дані для Portmone
    message?: string;
}

export interface WholesaleFormInputs {
    name: string; // Прізвище
    phone: string; // Маскований телефон
    email: string; // Додамо email, бо він зазвичай потрібен для контакту
    message: string; // Можливо, повідомлення
    is_promo_box?: boolean | null;
}

export interface PersonalDataFormInputs {
    name: string;
    last_name: string;
    middle_name: string; // Опціонально
    phone_number?: string;
    password: string;
    password_confirmation?: string;
}

export interface UpdateUserApiResponse {
    status: boolean;
    data: UserInfo; // Оновлені дані користувача
    message?: string;
}

export interface LoginWholeFormValues {
    phone_number: string;
    password: string;
}

export interface RegisterFormValues {
    name: string;
    entity_type: string;
    phone_number: string;
    password: string;
    password_confirmation: string;
}

export interface PromoCode {
    promo_code: string;
}