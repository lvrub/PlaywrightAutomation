Feature: Ecomerce validation
@Regression
 Scenario: Placing the Order
 Given a login to Ecommerce appl with "anshika100@gmail.com" and "A11111111a"
 When Add "zara coat 3" to Cart
 Then Verify "zara coat 3" is diplayed in the Cart
 When Enter valid details and place the Order
 Then Verify the order is presented in Order HIstory

 @Validation
 Scenario Outline: Placing the Order
 Given a login to Ecommerce2 appl with "<username>" and "<password>"
 Then Verify Error message is diplayed

Examples:
    | username          | password    |
    | anshika@gmail.com | Iamking@000 |
    | hello@123.com     | Iamhello@12 |

# npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
# npx cucumber-js --tags "@Validation" --exit
# npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber_report.html