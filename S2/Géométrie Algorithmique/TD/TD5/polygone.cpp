#include "nuage.cpp"

class Polygone {
    public:
        // Constructeur
        Polygone(NuagePoints);

        // Accesseur
        void setNP(NuagePoints);
        NuagePoints getNP();

        // Affichage
        void print();

        // Methodes
        void triPolaire(Point);
        void afficherGraphique();
        void afficherAlgoGraham(Polygone);

    private:
        NuagePoints nuage;
};

Polygone::Polygone(NuagePoints nnp) {
    nuage = nnp;
}

void Polygone::setNP(NuagePoints nnp) {
    nuage.copyNuagePoint(nnp);
}

NuagePoints Polygone::getNP() {
    return nuage;
}

void Polygone::print() {
    nuage.print();
}

void Polygone::triPolaire(Point p) {
    std::vector<double> rayons;
    for(int i=0; i<nuage.getPts().size(); i++) {
        double r;
        double o;
        nuage.getPts()[i].conversionPolaire(r, o, p);
        rayons.push_back(o);
    }
    std::sort(rayons.begin(), rayons.end());
    std::reverse(rayons.begin(), rayons.end());

    std::vector<Point> res;
    NuagePoints np (res);

    for(int i=0; i<rayons.size(); i++) {
        for(int y=0; y<nuage.getPts().size(); y++) {
            double r;
            double o;
            nuage.getPts()[y].conversionPolaire(r, o, p);
            if(o == rayons[i] && !(np.contientPoint(nuage.getPts()[y]))) {
                np.ajouterPoint(nuage.getPts()[y]);
            }
        }
    }

    nuage.copyNuagePoint(np);
}

void Polygone::afficherGraphique() {
    std::ofstream output ("Points.ps");
    output << "%!PS-Adobe-3.0" << std::endl;
    output << std::endl;

    std::vector<Point> pts = nuage.getPts();
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

    for(int i=0; i<(pts.size()-1); i++) {
        output << pts[i].getX() << " " << pts[i].getY() << " moveto" << std::endl;
        output << pts[i+1].getX() << " " << pts[i+1].getY() << " lineto" << std::endl;
        output << "stroke" << std::endl;
        output << std::endl;
    }

    output << pts[0].getX() << " " << pts[0].getY() << " moveto" << std::endl;
    output << pts[pts.size()-1].getX() << " " << pts[pts.size()-1].getY() << " lineto" << std::endl;
    output << "stroke" << std::endl;
    output << std::endl;

    output << "stroke" << std::endl;
    output << std::endl;
    output.close();
}

void Polygone::afficherAlgoGraham(Polygone depart) {
    std::ofstream output ("Points.ps");
    output << "%!PS-Adobe-3.0" << std::endl;
    output << std::endl;

    std::vector<Point> dep = depart.getNP().getPts();
    for(int i=0; i<dep.size(); i++) {
        output << dep[i].getX() << " " << dep[i].getY() << " 2 0 360 arc" << std::endl;
        output << "0 setgray" << std::endl;
        output << "fill" << std::endl;
        output << dep[i].getX()+offset << " " << dep[i].getY() << " moveto" << std::endl;
        output << "/Courier findfont 15 scalefont setfont" << std::endl;
        output << "( (" << dep[i].getX() << "," << dep[i].getY() << ") )" << " show" << std::endl;
        output << "stroke" << std::endl;
        output << std::endl;
    }

    for(int i=0; i<(dep.size()-1); i++) {
        output << dep[i].getX() << " " << dep[i].getY() << " moveto" << std::endl;
        output << dep[i+1].getX() << " " << dep[i+1].getY() << " lineto" << std::endl;
        output << "stroke" << std::endl;
        output << std::endl;
    }

    output << dep[0].getX() << " " << dep[0].getY() << " moveto" << std::endl;
    output << dep[dep.size()-1].getX() << " " << dep[dep.size()-1].getY() << " lineto" << std::endl;
    output << "stroke" << std::endl;
    output << std::endl;

    output << "0 0 1 setrgbcolor" << std::endl;
    for(int i=0; i<(nuage.getPts().size()-1); i++) {
        output << nuage.getPts()[i].getX() << " " << nuage.getPts()[i].getY() << " moveto" << std::endl;
        output << nuage.getPts()[i+1].getX() << " " << nuage.getPts()[i+1].getY() << " lineto" << std::endl;
        output << "stroke" << std::endl;
        output << std::endl;
    }

    output << nuage.getPts()[0].getX() << " " << nuage.getPts()[0].getY() << " moveto" << std::endl;
    output << nuage.getPts()[nuage.getPts().size()-1].getX() << " " << nuage.getPts()[nuage.getPts().size()-1].getY() << " lineto" << std::endl;
    output << "stroke" << std::endl;
    output << std::endl;

    output << "stroke" << std::endl;
    output << std::endl;
    output.close();
}