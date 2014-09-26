Feature: Collect actions at the next epoch and then execute together

  Scenario: Add single epoch into era and collect single event
    Given an epoch is added at "1000"
    And the era is started
    When an action named "action" occurs at "500"
    Then the action named "action" should be executed at "1000"

  Scenario: Add multiple epochs into era and collect during both

  Scenario: Add multiple epochs into era and collect during last period