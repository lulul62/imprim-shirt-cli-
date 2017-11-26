export default {
    /**
     * Estimate delivery cost for an order
     * @param weight
     * @returns {number|*}
     */
    estimateDeliveryPrice(weight) {
        let deliveryPrice;
        const price = [4.72, 5.41, 6.10, 6.83, 7.41, 8.21, 9.01, 9.83, 10.63, 11.45, 12.25, 13.05, 13.87, 14.67, 15.49,
            16.29, 17.10, 17.91, 18.71, 19.53, 20.33, 21.14, 21.95, 22.75, 23.57, 24.37, 25.18, 25.99, 26.79, 27.61, 28.41,
            29.22, 30.03, 30.83];
        const deliveryWeight = [0.25, 0.50, 0.75, 1.00, 2.00, 3.00, 4.00, 5.00, 6.00, 7.00, 8.00, 9.00, 10.00, 11.00, 12.00,
            13.00, 14.00, 15.00, 16.00, 17.00, 18.00,
            19.00, 20.00, 21.00, 22.00, 23.00, 24.00, 25.00, 26.00, 27.00, 28.00, 29.00, 30.00];
        switch (weight) {
            case weight < deliveryWeight[0]:
                deliveryPrice = price[0];
                break;
            case weight >= deliveryWeight[0] && weight <= deliveryWeight[1]:
                deliveryPrice = price[1];
                break;
            case weight >= deliveryWeight[1] && weight <= deliveryWeight[2]:
                deliveryPrice = price[2];
                break;
            case weight >= deliveryWeight[2] && weight <= deliveryWeight[3]:
                deliveryPrice = price[3];
                break;
            case weight >= deliveryWeight[3] && weight <= deliveryWeight[4]:
                deliveryPrice = price[4];
                break;
            case weight >= deliveryWeight[4] && weight <= deliveryWeight[5]:
                deliveryPrice = price[5];
                break;
            case weight >= deliveryWeight[5] && weight <= deliveryWeight[6]:
                deliveryPrice = price[6];
                break;
            case weight >= deliveryWeight[6] && weight <= deliveryWeight[7]:
                deliveryPrice = price[7];
                break;
            case weight >= deliveryWeight[7] && weight <= deliveryWeight[8]:
                deliveryPrice = price[8];
                break;
            case weight >= deliveryWeight[8] && weight <= deliveryWeight[9]:
                deliveryPrice = price[9];
                break;
            case weight >= deliveryWeight[9] && weight <= deliveryWeight[10]:
                deliveryPrice = price[10];
                break;
            case weight >= deliveryWeight[10] && weight <= deliveryWeight[11]:
                deliveryPrice = price[11];
                break;
            case weight >= deliveryWeight[11] && weight <= deliveryWeight[12]:
                deliveryPrice = price[12];
                break;
            case weight >= deliveryWeight[12] && weight <= deliveryWeight[13]:
                deliveryPrice = price[13];
                break;
            case weight >= deliveryWeight[13] && weight <= deliveryWeight[14]:
                deliveryPrice = price[14];
                break;
            case weight >= deliveryWeight[14] && weight <= deliveryWeight[15]:
                deliveryPrice = price[15];
                break;
            case weight >= deliveryWeight[15] && weight <= deliveryWeight[16]:
                deliveryPrice = price[16];
                break;
            case weight >= deliveryWeight[16] && weight <= deliveryWeight[17]:
                deliveryPrice = price[17];
                break;
            case weight >= deliveryWeight[17] && weight <= deliveryWeight[18]:
                deliveryPrice = price[18];
                break;
            case weight >= deliveryWeight[18] && weight <= deliveryWeight[19]:
                deliveryPrice = price[19];
                break;
            case weight >= deliveryWeight[19] && weight <= deliveryWeight[20]:
                deliveryPrice = price[20];
                break;
            case weight >= deliveryWeight[20] && weight <= deliveryWeight[21]:
                deliveryPrice = price[21];
                break;
            case weight >= deliveryWeight[21] && weight <= deliveryWeight[22]:
                deliveryPrice = price[22];
                break;
            case weight >= deliveryWeight[22] && weight <= deliveryWeight[23]:
                deliveryPrice = price[23];
                break;
            case weight >= deliveryWeight[23] && weight <= deliveryWeight[24]:
                deliveryPrice = price[24];
                break;
            case weight >= deliveryWeight[24] && weight <= deliveryWeight[25]:
                deliveryPrice = price[25];
                break;
            case weight >= deliveryWeight[25] && weight <= deliveryWeight[26]:
                deliveryPrice = price[26];
                break;
            case weight >= deliveryWeight[26] && weight <= deliveryWeight[27]:
                deliveryPrice = price[27];
                break;
            case weight >= deliveryWeight[27] && weight <= deliveryWeight[28]:
                deliveryPrice = price[28];
                break;
            case weight >= deliveryWeight[28] && weight <= deliveryWeight[29]:
                deliveryPrice = price[29];
                break;
            case weight >= deliveryWeight[29] && weight <= deliveryWeight[30]:
                deliveryPrice = price[30];
                break;
            case weight >= deliveryWeight[30] && weight <= deliveryWeight[31]:
                deliveryPrice = price[31];
                break;
            case weight >= deliveryWeight[31] && weight <= deliveryWeight[32]:
                deliveryPrice = price[32];
                break;
            case weight > deliveryWeight[32]:
                deliveryPrice = price[32];
                break;
                return deliveryPrice;
        }

    }
}
