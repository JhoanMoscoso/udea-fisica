# El péndulo con dos parámetros que cambian en el tiempo: mi camino hacia el Hamiltoniano y los invariantes adiabáticos

*Notas de un estudiante de Mecánica Teórica II — Universidad de Antioquia*

## Por qué elegí este problema

Para la tarea computacional sobre Formulación Hamiltoniana e Invariantes Adiabáticos tenía que elegir un sistema unidimensional cuyo Hamiltoniano dependiera de dos parámetros externos, $\lambda_1$ y $\lambda_2$, variando en el tiempo. Entre varias opciones que barajé, elegí una generalización de un problema clásico: el péndulo cuya longitud cambia lentamente.

Este problema tiene una historia que me pareció bonita descubrir: en la Conferencia Solvay de 1911 —la misma reunión donde Planck, Einstein y Lorentz discutían cómo cuantizar la física— alguien planteó la siguiente pregunta, aparentemente trivial: si un péndulo cuelga de una cuerda que pasa por un agujero en el techo, y alguien la jala muy lentamente, ¿qué le pasa a la frecuencia de oscilación? La energía no se conserva (se hace trabajo al jalar la cuerda), pero resulta que $E/\nu$ sí permanece prácticamente constante. Esa cantidad es, ni más ni menos, la variable de acción $I$.

Decidí generalizar ese problema histórico a **dos** parámetros independientes:

- $\lambda_1 = l(t)$: la longitud de la cuerda, que cambia porque alguien la jala (o la suelta) lentamente.
- $\lambda_2 = g_{\text{eff}}(t)$: una aceleración gravitacional efectiva, que podría representar, por ejemplo, un péndulo dentro de un ascensor cuya aceleración cambia lentamente.

## Primer tropiezo: ¿uno o dos grados de libertad?

Mi primera confusión fue conceptual, y por un momento me hizo dudar de todo el planteamiento. Para describir la posición del péndulo necesito su longitud $l(t)$ y su ángulo $\theta$:

$$\vec r(t) = l(t)\big(\sin\theta,\,-\cos\theta\big)$$

Como esta expresión usa dos cantidades, $l$ y $\theta$, mi instinto fue pensar que tenía dos grados de libertad. Pero no es así, y entender por qué fue un momento importante de claridad conceptual: $l(t)$ **no es una incógnita que el sistema resuelve dinámicamente** — es un dato externo, prescrito de antemano, exactamente igual que $g_{\text{eff}}(t)$. En el lenguaje formal, es una **restricción holónoma pero reónoma** (depende explícitamente del tiempo). Ese tipo de restricción reduce los grados de libertad, no los aumenta. El único grado de libertad genuinamente dinámico —el que aparece en las ecuaciones de movimiento— sigue siendo $\theta$.

## Construyendo la energía cinética (y cómo casi me pierdo en el camino)

Derivando $\vec r(t)$ con la regla del producto (recordando que tanto $l$ como $\theta$ dependen de $t$), obtuve:

$$\dot{\vec r}(t) = \big(\dot l\sin\theta + l\dot\theta\cos\theta,\; -\dot l\cos\theta + l\dot\theta\sin\theta\big)$$

y al calcular $|\dot{\vec r}|^2$, los términos cruzados con $\sin\theta\cos\theta$ se cancelan exactamente, dejando un resultado limpio y **exacto** (válido para cualquier amplitud, no solo oscilaciones pequeñas):

$$|\dot{\vec r}|^2 = \dot l^2 + (l\dot\theta)^2$$

Aquí cometí dos errores seguidos que vale la pena confesar, porque ambos me enseñaron algo:

**Error 1 — Aproximar antes de tiempo.** En un segundo intento, quise "simplificar" metiendo $\sin\theta\approx\theta$ y $\cos\theta\approx 1-\theta^2/2$ directamente dentro de las componentes de la velocidad, antes de elevarlas al cuadrado. Esto me generó términos espurios en $\theta^3$ y $\theta^4$ que no tenían ningún sentido físico. La lección: si truncas $\sin\theta$ y $\cos\theta$ en órdenes distintos y luego usas la identidad $\sin^2\theta+\cos^2\theta=1$, esa identidad deja de cumplirse exactamente, y aparecen residuos falsos. La energía cinética de este sistema **no necesita ninguna aproximación de ángulo pequeño** — la ortogonalidad entre la dirección radial y la tangencial ya elimina toda la dependencia angular, sin aproximar nada.

**Error 2 — Mezclar coordenadas cartesianas con polares.** Intenté verificar el resultado usando la fórmula de velocidad en polares, $v = \dot r\,\hat r + r\dot\theta\,\hat\theta$, pero inserté ahí las componentes cartesianas que ya había calculado ($\dot r_x$, $\dot r_y$, que sí llevan factores explícitos de $\sin\theta,\cos\theta$) como si fueran los coeficientes polares (que no deberían llevarlos). Son dos descomposiciones legítimas del mismo vector, en bases distintas, y no son intercambiables término a término. Rehaciendo el cálculo correctamente con $\hat r(\theta)=(\sin\theta,-\cos\theta)$ y $\hat\theta(\theta)=(\cos\theta,\sin\theta)$, y usando $d\hat r/d\theta=\hat\theta$, llegué exactamente al mismo resultado que ya tenía por el camino cartesiano — una confirmación cruzada muy satisfactoria.

Como $l(t)$ es un parámetro externo, el término $\frac12 m\dot l^2$ no depende de $\theta$ ni de $\dot\theta$, así que no contribuye en nada a la ecuación de movimiento de $\theta$ — puedo descartarlo, exactamente (no como aproximación), quedándome con la parte dinámicamente relevante:

$$T_\theta = \frac{1}{2}m\,l(t)^2\,\dot\theta^2$$

## El potencial: un error de signo que casi pasa desapercibido

Para la energía potencial usé $U=mg_{\text{eff}}(t)\,y$, con $y$ la componente vertical de la posición del bob. Aquí cometí un error tonto pero instructivo: en un intento sustituí por accidente la componente $y$ de la **velocidad** ($\dot r_y$) en vez de la componente $y$ de la **posición**. El resultado me daba un signo incorrecto en el término cuadrático:

$$U = -\frac{1}{2}mg_{\text{eff}}l\,\theta^2 \quad \text{(incorrecto)}$$

Lo detecté aplicando un criterio físico simple: un péndulo colgando en equilibrio en $\theta=0$ debe ser **estable**, lo cual exige que $U$ tenga un **mínimo** ahí, es decir, $\partial^2 U/\partial\theta^2|_0 > 0$. Mi resultado tenía el signo contrario — señal inequívoca de un error. Corrigiendo con $y(\theta)=-l(t)\cos\theta$ (la posición correcta), y expandiendo $\cos\theta\approx 1-\theta^2/2$:

$$U(\theta;t) = \frac{1}{2}m\,g_{\text{eff}}(t)\,l(t)\,\theta^2$$

Esta vez sí, sin término lineal en $\theta$ (como corresponde a expandir alrededor de un equilibrio genuino) y con el signo correcto para un mínimo estable.

## Reuniendo las piezas: Lagrangiano, momento conjugado y Hamiltoniano

Con $T_\theta$ y $U$ confirmados:

$$L(\theta,\dot\theta;t) = \frac{1}{2}m\,l(t)^2\dot\theta^2 - \frac{1}{2}m\,g_{\text{eff}}(t)\,l(t)\,\theta^2$$

El momento conjugado:

$$p_\theta = \frac{\partial L}{\partial\dot\theta} = m\,l(t)^2\dot\theta \quad\Longrightarrow\quad \dot\theta = \frac{p_\theta}{m\,l(t)^2}$$

Y la transformada de Legendre da el Hamiltoniano:

$$H(\theta,p_\theta;l(t),g_{\text{eff}}(t)) = \frac{p_\theta^2}{2m\,l(t)^2} + \frac{1}{2}m\,g_{\text{eff}}(t)\,l(t)\,\theta^2$$

Verifiqué dos cosas antes de confiar en este resultado: consistencia dimensional (cada término tiene unidades de energía), y que en el límite de parámetros constantes se reduce exactamente al oscilador armónico simple, con masa efectiva (momento de inercia) $M=ml^2$ y frecuencia $\omega^2 = g_{\text{eff}}/l$.

Sobre esta última fórmula: en un primer intento la escribí invertida, $\omega^2 = l/g$. La corregí con análisis dimensional — $[g]=\text{m/s}^2$, $[l]=\text{m}$, y solo $g/l$ da unidades de $\text{s}^{-2}$, que es lo que necesita $\omega^2$.

Las ecuaciones canónicas de Hamilton, que son las que se integran numéricamente, quedan:

$$\dot\theta = \frac{p_\theta}{m\,l(t)^2}, \qquad \dot p_\theta = -m\,g_{\text{eff}}(t)\,l(t)\,\theta$$

## La variable de acción y la condición de adiabaticidad

A parámetros congelados en un instante dado, el sistema es un oscilador armónico con $\omega(t)=\sqrt{g_{\text{eff}}(t)/l(t)}$, así que la variable de acción es directamente:

$$I(t) = \frac{E(t)}{\omega(t)} = E(t)\sqrt{\frac{l(t)}{g_{\text{eff}}(t)}}$$

La condición de adiabaticidad, siguiendo a Landau (§49-51), se traduce aquí en dos desigualdades simultáneas:

$$\left|\frac{\dot l}{l}\right| \ll \omega(t), \qquad \left|\frac{\dot g_{\text{eff}}}{g_{\text{eff}}}\right| \ll \omega(t)$$

Para explorarlas numéricamente, elegí perfiles sinusoidales con tasas independientes:

$$l(t) = l_0\big(1+\epsilon_1\sin(\Omega_1 t)\big), \qquad g_{\text{eff}}(t) = g_0\big(1+\epsilon_2\sin(\Omega_2 t)\big)$$

con $\epsilon_1,\epsilon_2\ll 1$ y $\omega_0=\sqrt{g_0/l_0}$ la frecuencia natural sin perturbar. Definí los parámetros adimensionales de adiabaticidad:

$$\eta_1 = \frac{\Omega_1}{\omega_0}, \qquad \eta_2 = \frac{\Omega_2}{\omega_0}$$

con $\eta_i\ll 1$ correspondiendo al régimen adiabático y $\eta_i \gtrsim 1$ al no adiabático.

## Lo que viene: la simulación numérica

El plan es integrar las ecuaciones de Hamilton con RK4, calcular $I(t)$ en cada paso y cuantificar su desviación relativa, $\Delta I/I_0$, barriendo una rejilla de valores $(\eta_1,\eta_2)$. Un detalle que tuve que tener presente: RK4 no es un integrador simpléctico, así que antes de sacar conclusiones sobre la conservación de $I$ hay que hacer una prueba de convergencia (reducir el paso de tiempo a la mitad y verificar que el resultado no cambie apreciablemente) — de lo contrario, una deriva lenta de $I$ podría ser puro artefacto numérico y no física real.

## Reflexión final

Lo que más me llevo de este ejercicio no es la fórmula final, sino cuántas de mis equivocaciones vinieron de saltarme pasos que parecían "obvios": confundir una coordenada con un parámetro, aproximar antes de usar una identidad exacta, mezclar dos sistemas de coordenadas, o sustituir velocidad donde iba posición. Cada uno de esos errores, cuando lo revisé con calma, tenía una razón física clara detrás — y encontrarla fue, honestamente, la parte más valiosa de todo el proceso.
