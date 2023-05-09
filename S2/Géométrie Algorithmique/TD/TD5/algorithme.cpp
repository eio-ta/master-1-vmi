#include "cercle.cpp"

void algorithme_graham(Polygone p) {
    std::cout << "Algorithme de Graham : EN ATTENTE" << std::endl;
    std::cout << "[INFO] Tri du nuage de points : EN ATTENTE" << std::endl;
    int index = 0;
    double min, o;
    p.getNP().getPts()[0].conversionPolaire(min, o, Point(0, 0));
    for(int i=0; i<p.getNP().getPts().size(); i++) {
        double r;
        double o;
        p.getNP().getPts()[i].conversionPolaire(r, o, Point(0, 0));
        if(r < min) {
            index = i;
            min = r;
        }
    }
    std::cout << "[INFO] Tri du nuage de points : OK" << std::endl;
    std::cout << "[INFO] Récupération du point d'origine : EN ATTENTE" << std::endl;
    Point ori (p.getNP().getPts()[index]);
    std::cout << "[INFO] Récupération du point d'origine : OK" << std::endl;
    std::cout << "[INFO] Tri polaire : EN ATTENTE" << std::endl;
    NuagePoints n = p.getNP();
    n.supprimerPoint(ori);
    Polygone p1 (n);
    p1.triPolaire(ori);
    std::cout << "[INFO] Tri polaire : OK" << std::endl;
    std::cout << "[INFO] Tracage du polygone étoilé : EN ATTENTE" << std::endl;
    NuagePoints n1 = p1.getNP();
    n1.ajouterPoint(ori);
    Polygone p2 (n1);
    std::cout << "[INFO] Tracage du polygone étoilé : OK" << std::endl;
    std::cout << "[INFO] Suppression des angles rentrants : EN ATTENTE" << std::endl;
    NuagePoints n2 = p2.getNP();
    n2.suppressionAngleRentrant();
    Polygone p3(n2);
    p3.afficherAlgoGraham(p2);
    std::cout << "[INFO] Suppression des angles rentrants : OK" << std::endl;
    std::cout << "Algorithme de Graham : OK" << std::endl;
}

void divide(Polygone p, std::vector<NuagePoints>& nps) {
    std::cout << "[INFO] Etape de la division : EN ATTENTE" << std::endl;
    int n = p.getNP().getPts().size();
    NuagePoints np0 = p.getNP();
    np0.trierNuagePoint();

    int indice = 0;
    NuagePoints npi;
    for(int i=0; i<n/3; i++) {
        npi.ajouterPoint(np0.getPts()[indice]);
        npi.ajouterPoint(np0.getPts()[indice+1]);
        npi.ajouterPoint(np0.getPts()[indice+2]);
        indice += 3;
        nps.push_back(npi);
        npi.clear();
    }

    if((n/3*3) != n) {
        for(int j=indice; j<n; j++) {
            npi.ajouterPoint(np0.getPts()[j]);
        }
        nps.push_back(npi);
        npi.clear();
    }
    std::cout << "[INFO] Etape de la division : OK" << std::endl;
}

void delauvey(Polygone p) {
    p.getNP().affichageGraphique();
    std::vector<NuagePoints> nps;
    divide(p, nps);

    for(int i=0; i<nps.size(); i++) {
        nps[i].print();
    }

    std::cout << "[INFO] Étape de fusion : EN ATTENTE" << std::endl;
    std::cout << "[INFO] Étape de fusion : OK" << std::endl;
}