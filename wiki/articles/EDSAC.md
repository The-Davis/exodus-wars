---
title: "EDSAC"
page_id: 633
namespace: 0
namespace_name: "Main"
latest_revision_id: 1903
last_updated: "2007-07-30 01:41:58"
author: "Myiven"
is_redirect: false
categories:
  - "Computers"
templates: []
---

'''EDSAC''' ''('''E'''lectronic '''D'''elay '''S'''torage '''A'''utomatic '''C'''alculator)'' was an early [[British Empire (Terra)|British]] [[:Category:Computers|computer]], and was one of the first [[Terran]] computers to be created.  The machine, having been inspired by [[John von Neumann]]'s seminal [[EDVAC]] report, was constructed by Professor Sir [[Maurice Wilkes]] and his team at the [[University of Cambridge]] [[University of Cambridge Mathematical Laboratory|Mathematical Laboratory]] in [[England]].

EDSAC was the world's first ''practical'' [[stored program]] electronic computer, although not the first stored program computer (that honor goes to the [[Small-Scale Experimental Machine]]).

The project was supported by [[J. Lyons and Co.|J. Lyons & Co. Ltd.]], a British firm, who were rewarded with the first commercially applied computer, [[LEO I]], based on the EDSAC design.  EDSAC ran its first programs on [[May 6]], [[1949]], calculating a table of squares<ref>To be precise, EDSAC's first program printed a list of the [[square number|square]]s of the [[integer (computer science)|integer]]s from 0 to 99 inclusive.</ref> and a list of prime numbers.

==Technical overview==
===Physical components===
As soon as EDSAC was constructed, it began serving the University's research needs.  None of its components were experimental.  It used [[delay line memory|mercury delay line]]s for memory, and derated [[vacuum tube]]s for logic. Input was via 5-hole [[punched tape]] and output was via a [[teleprinter]].

Initially registers were limited to an [[Accumulator (computing)|accumulator]] and a multiplier register. In 1953, [[David Wheeler (computer scientist)|David Wheeler]], returning from a stay at the [[University of Illinois at Urbana-Champaign|University of Illinois]], designed an [[index register]] as an extension to the original EDSAC hardware.

===Memory and instructions===
The EDSAC's memory consisted of 1024 locations, though only 512 locations were initially implemented. Each contained 18 bits, but the first bit was unavailable due to timing restrictions, so only 17 bits were used. An instruction consisted of a five-bit instruction code (designed to be represented by a mnemonic letter, so that the Add instruction, for example, used the bit pattern for the letter A), eleven bits for a memory address (although with 1024 words, only 10 bits were needed), and one bit (for certain instruction) to control whether the instruction operated on a number contained in one word or two.

Internally, the EDSAC used [[twos complement]], [[Binary numeral system|binary]] numbers.  These were either 17-bit (one word) or 35-bit (two words) long.  Unusually, the [[Multiplication ALU|multiplier]] was designed to treat numbers as [[fixed-point]] fractions in the range -1 ≤ ''x'' &lt; 1, ie the binary point was immediately to the right of the sign.  The [[Accumulator (computing)|accumulator]] could hold 71-bits, including the sign, allowing two long (35-bit) numbers to be multiplied without losing any precision.

The instructions available were: add, subtract, multiply, collate<ref>This instruction added the [[bitwise AND]] of the specified memory word and the multiplier register to the accumulator.</ref>, shift left, shift right, load multiplier register, store (and optionally clear) accumulator, conditional skip, read input tape, print character, round accumulator, no-op and stop.  There was no division instruction (though a number of division subroutines were available) and no way to directly load a number into the accumulator (a "store and zero accumulator" instruction followed by an "add" instruction were necessary for this).

===System software===
The ''initial orders'' were hard-wired on a set of [[uniselector]] switches and loaded into the low words of memory at startup.  By September [[1949]], the initial orders had reached their final form and provided a primitive relocating [[Assembly language#Assembler|assembler]] taking advantage of the mnemonic design described above, all in 41 words.

===Application software===
An unusual feature of EDSAC was the availability of a substantial subroutine library.  By [[1951]], 87 subroutines in the following categories were available for general use: [[floating point arithmetic]]; arithmetic operations on [[complex numbers]]; checking; division; [[exponentiation]]; routines relating to functions; [[differential equations]]; special functions; [[power series]]; [[logarithms]]; miscellaneous; print and layout; [[Numerical integration|quadrature]]; read (input); ''n''th root; [[Trigonometric functions]]; counting operations (simulating "repeat", "while" and "for" loops); [[probability vector|vectors]] and [[matrix (mathematics)|matrices]].

==Applications of EDSAC==
*In 1951, Miller and Wheeler used the machine to discover a 79-digit prime&mdash;the largest known at the time.
*In 1952 [[A.S. Douglas]] developed ''[[OXO]]'', a version of [[noughts and crosses]] (tic-tac-toe) for the EDSAC, with graphical output to a [[cathode ray tube]]. This may well have been the world's first [[video game]].
*In the 1960s EDSAC was used to gather numerical evidence about solutions to [[elliptic curve]]s, which led to the [[Birch and Swinnerton-Dyer conjecture]].

==Further developments==

EDSAC's successor, [[EDSAC 2]], was commissioned in 1958. In 1961 an EDSAC 2 version of [[Autocode]], an [[ALGOL]]-like high-level programming language for scientists and engineers, was developed by D. F. Hartley.

In the mid-60s, a successor to the EDSAC 2 was planned, but the move was instead made to the [[Titan (computer)|Titan]], a prototype Atlas 2&mdash;the latter having been developed from the [[Atlas Computer]] of the [[Victoria University of Manchester|University of Manchester]], [[Ferranti]], and [[Plessey]].

[[Category:Computers]]