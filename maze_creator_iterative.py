import random
import turtle
from enum import Enum
import numpy as np

class Direccion(Enum):
    arriba = 1
    derecha = 2
    abajo = -1
    izquierda = -2

def valida_todas_recorridas(casillas_recorridas):
    for i in range(casillas_recorridas.shape[0]):
        for j in range(casillas_recorridas.shape[1]):
            if casillas_recorridas[i, j] == False:
                return False
    return True

def busca_camino_possible(posicion_actual):
    contador = 0; direcciones_possibles = list(Direccion)
    while True:
        nueva_direccion = random.choice(direcciones_possibles)
        direcciones_possibles.remove(nueva_direccion)
        i, j = posicion_actual
        if nueva_direccion == Direccion.arriba:
            i -= 1
        elif nueva_direccion == Direccion.derecha:
            j += 1
        elif nueva_direccion == Direccion.abajo:
            i += 1
        else:
            j -= 1
        if 0 <= i < m and 0 <= j < n and casillas_marcadas[i, j] == False:
            encontrado_camino = True
            return nueva_direccion, (i, j), encontrado_camino
        elif contador >= 3:
            encontrado_camino = False
            return nueva_direccion, (i, j), encontrado_camino
        contador += 1

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

m, n = 9, 9; paso_pixeles = 25
stack_camino = []; stack_laberinto = []
casillas_marcadas = np.empty((m, n), dtype=bool)
for i in range(casillas_marcadas.shape[0]):
    for j in range(casillas_marcadas.shape[1]):
        casillas_marcadas[i, j] = False
inicio = m - 1, n - 1; final = 0, 0
i, j = inicio
casillas_marcadas[i, j] = True
turtle.penup()
# turtle.setpos(paso_pixeles * (m - i), paso_pixeles * j)
turtle.setpos(50, 50)
turtle.pendown()
posicion = inicio
while not valida_todas_recorridas(casillas_marcadas):
    direccion, posicion, encontrado_camino = busca_camino_possible(posicion)
    if encontrado_camino:
        mueve(direccion)
        stack_camino.append(direccion)
        stack_laberinto.append(direccion)
        i, j = posicion
        casillas_marcadas[i, j] = True
    else:
        while True:
            direccion = stack_camino.pop()
            direccion_inversa = Direccion(-1 * direccion.value)
            mueve(direccion_inversa)
            i, j = posicion
            if direccion_inversa == Direccion.arriba:
                i -= 1
            elif direccion_inversa == Direccion.derecha:
                j += 1
            elif direccion_inversa == Direccion.abajo:
                i += 1
            else:
                j -= 1
            posicion = i, j
            direccion, posicion, encontrado_camino = \
                busca_camino_possible(posicion)
            if encontrado_camino:
                mueve(direccion)
                stack_camino.append(direccion)
                stack_laberinto.append(direccion)
                break
            elif not stack_camino:
                raise Exception('Creacion de laberinto incorrecta.')
            else:
                continue
