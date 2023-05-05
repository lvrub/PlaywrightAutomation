Feature: Ecomerce validation

 Scenario: Placing the Order
 Given a login to Ecommerce appl with "anshika100@gmail.com" and "A11111111a"
 When Add "zara coat 3" to Cart
 Then Verify "zara coat 4" is diplayed in the Cart
 When Enter valid details and place the Order
 Then Verify the order is presented in Order HIstory