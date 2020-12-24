
Feature: Tiket.com Skill Test

  Scenario: Product hotel: Create transaction with non-instant payment for xx guest and xx room and login using Facebook

    Given a web browser is on the Tiket.com page
    When the user search hotel with "2" days from today, "6" guest and "2" room
    And the user filter results with Rp."400000" max prices