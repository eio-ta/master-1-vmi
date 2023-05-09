#include "algorithme.cpp"

int main() {
    srand(time(NULL));

    NuagePoints np;
    np.genereNuagePointAlea(10, 500, 500);

    Polygone po(np);
    // algorithme_graham(po);
    enveloppe_convexe_divide_and_conqueer(po);

    // std::cout << c.estDansCercle(p) << std::endl;





    return 0;
}