#include "polygone.cpp"

class Cercle {
    public:
        // Constructeur
        Cercle(Point, double);

        // Accesseurs
        void setCentre(Point);
        Point getCentre();
        void setRayon(double);
        double getRayon();

        // Méthode
        int estDansCercle(Point);
        Cercle cercle_circonscrit(Point, Point, Point);

    private:
        Point centre;
        double rayon;
};

Cercle::Cercle(Point c, double r) {
    centre.setX(c.getX());
    centre.setY(c.getY());
    rayon = r;   
}

void Cercle::setCentre(Point c) {
    centre.setX(c.getX());
    centre.setY(c.getY());
}

Point Cercle::getCentre() {
    return centre;
}

void Cercle::setRayon(double r) {
    rayon = r;
}

double Cercle::getRayon() {
    return rayon;
}

int Cercle::estDansCercle(Point p) {
    double distance, angle;
    p.conversionPolaire(distance, angle, centre);
    return distance <= rayon;
}

Cercle Cercle::cercle_circonscrit(Point p1, Point p2, Point p3) {
    double x1 = p1.getX();
    double y1 = p1.getY();
    double x2 = p2.getX();
    double y2 = p2.getY();
    double x3 = p3.getX();
    double y3 = p3.getY();

    double a = x1 * (y2 - y3) - y1 * (x2 - x3) + x2 * y3 - x3 * y2;
    double b = (pow(x1, 2) + pow(y1, 2))*(y3 - y2) + (pow(x2, 2) + pow(y2, 2))*(y1 - y3) + (pow(x3, 2) + pow(y3, 2))*(y2 - y1);
    double c = (pow(x1, 2) + pow(y1, 2))*(x2 - x3) + (pow(x2, 2) + pow(y2, 2))*(x3 - x1) + (pow(x3, 2) + pow(y3, 2))*(x1 - x2);
    double d = (pow(x1, 2) + pow(y1, 2))*(x3 * y2 - x2 * y3) + (pow(x2, 2) + pow(y2, 2))*(x1 * y3 - x3 * y1) + (pow(x3, 2) + pow(y3, 2))*(x2 * y1 - x1 * y2);

    double centre_x = -b/(2*a);
    double centre_y = -c/(2*a);
    double rayon = sqrt(pow(centre_x - x1, 2) + pow(centre_y - y1, 2));

    return Cercle(Point(centre_x, centre_y), rayon);
}