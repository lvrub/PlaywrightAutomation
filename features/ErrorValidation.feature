Feature: Ecomerce validation
@Validation
 Scenario Outline: Placing the Order
 Given a login to Ecommerce2 appl with "<username>" and "<password>"
 Then Verify Error message is diplayed

Examples:
    | username          | password    |
    | anshika@gmail.com | Iamking@000 |
    | hello@123.com     | Iamhello@12 |


