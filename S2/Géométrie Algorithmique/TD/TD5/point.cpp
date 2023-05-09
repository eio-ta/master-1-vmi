#include <iostream>
#include <random>
#include <algorithm>
#include <vector>
#include <fstream>
#include <tgmath.h>

class Point {
    public:
        // Constructeurs
        Point();
        Point(int, int);

        // Accesseurs
        void setX(int);
        void setY(int);
        int getX();
        int getY();

        // Affichage
        void print();

        // Méthodes
        void genererPointAleatoire(int, int);
        double distanceEuclidienne(Point);

        // Surcharge des opérateurs
        bool operator >(Point p) {
            if(x > p.x) return true;
            else if(x < p.x) return false;
            else {
                if(y > p.y) return true;
                else return false;
            }
        }

        bool operator <(Point p) {
            if(x > p.x) return false;
            else if(x < p.x) return true;
            else {
                if(y < p.y) return true;
                else return false;
            }
        }

        // Methodes rajoutées pour la simplification des TD
        void conversionPolaire(double &, double &, Point);

    private:
        int x;
        int y;

};


Point::Point() {
    x = 0;
    y = 0;
}

Point::Point(int nx, int ny) {
    x = nx;
    y = ny;
}

void Point::setX(int nx) {
    x = nx;
}

void Point::setY(int ny) {
    y = ny;
}

int Point::getX() {
    return x;
}

int Point::getY() {
    return y;
}

void Point::print() {
    std::cout << "Point(" << x << ", " << y << ")" << std::endl;
}

void Point::genererPointAleatoire(int borneX, int borneY) {
    x = rand() % borneX;
    y = rand() % borneY;
}

double Point::distanceEuclidienne(Point p) {
    double dx = x-p.x;
    double dy = y-p.y;
    return sqrt(dx*dx + dy*dy); 
}

void Point::conversionPolaire(double &r, double &o, Point ori) {
    r = sqrt((x-ori.getX())*(x-ori.getX()) + (y-ori.getY())*(y-ori.getY()));
    o = atan2((double)y - (double) ori.getY(), (double)x - ori.getX());
}