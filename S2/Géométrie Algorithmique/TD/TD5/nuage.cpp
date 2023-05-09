#include "vecteur.cpp"

const int offset = 1;


class NuagePoints {
    public:
        // Constructeur
        NuagePoints();
        NuagePoints(std::vector<Point>);

        // Accesseurs
        void setPts(std::vector<Point>);
        std::vector<Point> getPts();

        // Affichage
        void print();

        // Methodes
        void genereNuagePointAlea(int, int, int);
        void copyNuagePoint(NuagePoints);
        void ajouterPoint(Point);
        void supprimerPoint(Point);
        void trierNuagePoint();
        void affichageGraphique();

        // Methodes rajoutes pour gagner du temps pour le TD
        bool contientPoint(Point);
        void suppressionAngleRentrant();
        void clear();
    
    private:
        std::vector<Point> pts;

};

NuagePoints::NuagePoints() {
    pts.clear();
}

NuagePoints::NuagePoints(std::vector<Point> pt) {
    pts.clear();
    for(int i = 0; i < pt.size(); i++) {
        Point p = Point (pt[i].getX(), pt[i].getY());
        pts.push_back(p);
    }
}

void NuagePoints::setPts(std::vector<Point> pt) {
    pts.clear();
    for(int i = 0; i < pt.size(); i++) {
        Point p = Point (pt[i].getX(), pt[i].getY());
        pts.push_back(p);
    }
}

std::vector<Point> NuagePoints::getPts() {
    return pts;
}

void NuagePoints::print() {
    for(int i=0; i<pts.size(); i++) {
        pts[i].print();
    }
}

void NuagePoints::genereNuagePointAlea(int nb, int borneX, int borneY) {
    for(int i=0; i<nb; i++) {
        Point p;
        p.genererPointAleatoire(borneX, borneY);
        pts.push_back(p);
    }
}

void NuagePoints::copyNuagePoint(NuagePoints np) {
    pts.clear();
    for(int i = 0; i < np.getPts().size(); i++) {
        Point p = Point(np.getPts()[i].getX(), np.getPts()[i].getY());
        pts.push_back(p);
    }
}

void NuagePoints::ajouterPoint(Point o) {
    pts.insert(pts.begin(), o);
}

void NuagePoints::supprimerPoint(Point o) {
    int x = o.getX();
    int y = o.getY();
    for(int i=0; i<pts.size(); i++) {
        if(x == pts[i].getX() && y == pts[i].getY()) {
            pts.erase(pts.begin() + i);
        }
    }
}

void NuagePoints::trierNuagePoint() {
    std::sort(pts.begin(), pts.end());
}

void NuagePoints::affichageGraphique() {
    std::ofstream output ("Points.ps");
    output << "%!PS-Adobe-3.0" << std::endl;
    output << std::endl;

    for(int i=0; i<pts.size(); i++) {
        output << pts[i].getX() << " " << pts[i].getY() << " 2 0 360 arc" << std::endl;
        output << "0 setgray" << std::endl;
        output << "fill" << std::endl;
        output << pts[i].getX()+offset << " " << pts[i].getY() << " moveto" << std::endl;
        output << "/Courier findfont 15 scalefont setfont" << std::endl;
        output << "( (" << pts[i].getX() << "," << pts[i].getY() << ") )" << " show" << std::endl;
        output << "stroke" << std::endl;
        output << std::endl;
    }

    output << "stroke" << std::endl;
    output << std::endl;
    output.close();
}

bool NuagePoints::contientPoint(Point p) {
    for(int i=0; i<pts.size(); i++) {
        if(p.getX() == pts[i].getX() && p.getY() == pts[i].getY()) return true;
    }
    return false;
}

void NuagePoints::suppressionAngleRentrant() {
    pts.push_back(pts[0]);
    if(pts.size() > 2) {
        int index = 1;
        Point tmp (pts[index].getX(), pts[index].getY());
        Point tmp1 (pts[index+1].getX(), pts[index+1].getY());
        Point tmp2 (pts[index+2].getX(), pts[index+2].getY());

        while(tmp1.getX() != pts[0].getX() && tmp1.getY() != pts[0].getY()) {
            Vecteur v1 (tmp, tmp2);
            if(v1.puissance(tmp1) > 0) {
                index += 1;
                tmp.setX(pts[index].getX());
                tmp.setY(pts[index].getY());
                tmp1.setX(pts[index+1].getX());
                tmp1.setY(pts[index+1].getY());
                tmp2.setX(pts[index+2].getX());
                tmp2.setY(pts[index+2].getY());
            } else {
                NuagePoints::supprimerPoint(tmp1);
                index -= 1;
                tmp.setX(pts[index].getX());
                tmp.setY(pts[index].getY());
                tmp1.setX(pts[index+1].getX());
                tmp1.setY(pts[index+1].getY());
                tmp2.setX(pts[index+2].getX());
                tmp2.setY(pts[index+2].getY());
            }
        }
    }
}

void NuagePoints::clear() {
    pts.clear();
}