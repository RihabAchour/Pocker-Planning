package tn.esprit.pockerplanning.entities.enums;

public enum Complexity { ONE(1),
    TWO(2),
    THREE(3),
    FIVE(5),
    EIGHT(8)
    , THIRTEEN(13);

    private final int value;

    Complexity(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
