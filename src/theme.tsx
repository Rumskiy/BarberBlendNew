export const antdThemeConfig = {
    token: { // Для antd v5+
        colorPrimary: '#DD5D03', // Ваш основний колір
        // Можна налаштувати інші токени тут, якщо потрібно
        // colorPrimaryHover: '#your_hover_color', // Наприклад
        // borderRadius: 6, // Глобальний радіус
    },
    components: { // Для більш точного налаштування конкретних компонентів (якщо token недостатньо)
        Checkbox: {
            colorPrimary: '#DD5D03',
            colorPrimaryHover: '#E77A2E',
            // colorPrimaryBorder: '#DD5D03', // Якщо потрібно для бордера
        },
        Select: {
            colorPrimary: '#DD5D03', // Колір при фокусі, активний бордер
            colorPrimaryHover: '#E77A2E', // Колір при наведенні на активний елемент (не завжди працює для бордера)
            fontSize: 16,
            borderRadius: 12
            // optionSelectedBg: 'rgba(221, 93, 3, 0.1)', // Фон обраного елемента у списку
            // controlItemBgHover: 'rgba(221, 93, 3, 0.05)', // Фон при наведенні на елемент у списку
        },
        Spin: {
            colorPrimary: '#DD5D03', // Колір спінера
        }
    }
};