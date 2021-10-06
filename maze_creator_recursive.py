import random
import turtle
from enum import Enum
import numpy as np


class Direccion(Enum):
    arriba = 1
    derecha = 2
    abajo = -1
    izquierda = -2

    @classmethod
    def get_inversa(self, direccion):
        return Direccion(-1 * direccion.value)


class Nodo:
    def __init__(self, vuelta):
        self.hijos = []
        self.direcciones = []
        self.vuelta = vuelta
        self.raiz = False

    def marca_raiz(self):
        self.raiz = True


def mueve(direccion):
    if direccion == Direccion.arriba:
        turtle.setheading(90)
        turtle.forward(paso_pixeles)
    elif direccion == Direccion.derecha:
        turtle.setheading(0)
        turtle.forward(paso_pixeles)
    elif direccion == Direccion.abajo:
        turtle.setheading(270)
        turtle.forward(paso_pixeles)
    else:
        turtle.setheading(180)
        turtle.forward(paso_pixeles)


def avanza_retrocede_casilla(nodo_padre, posicion):
    direcciones_validas = direcciones.copy()
    for _ in range(len(direcciones)):
        direccion = random.choice(direcciones_validas)
        direcciones_validas.remove(direccion)
        i, j = posicion
        if direccion == Direccion.arriba:
            i -= 1
        elif direccion == Direccion.derecha:
            j += 1
        elif direccion == Direccion.abajo:
            i += 1
        else:
            j -= 1
        posicion_siguiente = i, j
        if 0 <= i < m and 0 <= j < n and casillas_marcadas[i, j] == False:
            casillas_marcadas[i, j] = True
            nodo = Nodo(Direccion.get_inversa(direccion))
            nodo_padre.hijos.append(nodo)
            nodo_padre.direcciones.append(direccion)
            mueve(direccion)
            del i, j
            avanza_retrocede_casilla(nodo, posicion_siguiente)
            mueve(Direccion.get_inversa(direccion))


m, n = 10, 10; paso_pixeles = 25
casillas_marcadas = np.empty((m, n), dtype=bool)
casillas_marcadas.fill(False)
inicio = m - 1, n - 1; final = 0, 0
i, j = inicio
casillas_marcadas[i, j] = True
turtle.penup()
turtle.setpos(50, 50)
turtle.pendown()
nodo_raiz = Nodo(None)
nodo_raiz.marca_raiz()
direcciones = list(Direccion)
avanza_retrocede_casilla(nodo_raiz, inicio)
turtle.mainloop()
