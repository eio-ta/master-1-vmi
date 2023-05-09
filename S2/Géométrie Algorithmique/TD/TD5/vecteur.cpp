#include "point.cpp"

class Vecteur {
    public:
        // Constructeurs
        Vecteur(Point, Point);

        // Accesseurs
        void setP0(Point);
        void setP1(Point);
        Point getP0();
        Point getP1();

        // Affichage
        void print();

        // Méthodes
        double calculPente();
        double puissance(Point);
        int produitScalaire(Vecteur);
        int determinant(Vecteur);

        // Surcharge de l'opérateur
        bool operator >(Vecteur v) {
            double x0 = Vecteur::calculPente();
            double x1 = v.calculPente();
            return x0 > x1;
        }

    private:
        Point p0;
        Point p1;
};


Vecteur::Vecteur(Point o1, Point o2) {
    p0 = Point(o1.getX(), o1.getY());
    p1 = Point(o2.getX(), o2.getY());
}

void Vecteur::setP0(Point o) {
    p0.setX(o.getX());
    p0.setY(o.getY());
}

void Vecteur::setP1(Point o) {
    p1.setX(o.getX());
    p1.setY(o.getY());
}

Point Vecteur::getP0() {
    return p0;
}

Point Vecteur::getP1() {
    return p1;
}

void Vecteur::print() {
    std::cout << "P0 : ";
    p0.print();
    std::cout << "P1 : ";
    p1.print();
}

double Vecteur::calculPente() {
    double num = p0.getY() - p1.getY();
    double den = p0.getX() - p1.getX();
    return num / den;
}

double Vecteur::puissance(Point m) {
    double d1 = (p1.getY()-p0.getY()) * (m.getX()-p0.getX());
    double d2 = (p1.getX()-p0.getX()) * (m.getY()-p0.getY());
    return d1-d2;
}

int Vecteur::produitScalaire(Vecteur v) {
    int v0[2];
    v0[0] = p1.getX() - p0.getX();
    v0[1] = p1.getY() - p0.getY();

    int v1[2];
    v1[0] = v.getP1().getX() - v.getP0().getX();
    v1[1] = v.getP1().getY() - v.getP0().getY();

    return v0[0]*v1[0] + v0[1]*v1[1];
}

int Vecteur::determinant(Vecteur v) {
    int v0[2];
    v0[0] = p1.getX() - p0.getX();
    v0[1] = p1.getY() - p0.getY();

    int v1[2];
    v1[0] = v.getP1().getX() - v.getP0().getX();
    v1[1] = v.getP1().getY() - v.getP0().getY();

    return v0[0]*v1[1] - v1[0]*v0[1];
}