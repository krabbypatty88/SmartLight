###################################################################################
# Propositional Model Checker inspired by Knowledge Lecture from CS50 AI for Python
###################################################################################

import itertools

class Sentence():
  def evaluate(self, model): 
    raise NotImplementedError
  def symbols(self):
    return set()

class Symbol(Sentence):
  def __init__(self, name):
    self.name = name
  def __repr__(self): 
    return self.name
  def __eq__(self, other):
    return isinstance(other, Symbol) and self.name == other.name
  def __hash__(self):
    return hash(("symbol", self.name))
  def evaluate(self, model):
    return bool(model.get(self.name, False))
  def symbols(self):
    return {self.name}

class And(Sentence):
  def __init__(self, *conjuncts):
    self.conjuncts = list(conjuncts)
  def __repr__(self):
    return "And(" + ", ".join(map(str, self.conjuncts)) + ")"
  def add(self, conjunct):
    self.conjuncts.append(conjunct)
  def evaluate(self, model): 
    return all(c.evaluate(model) for c in self.conjuncts)
  def symbols(self):
    if not self.conjuncts: 
      return set()
    for c in self.conjuncts: 
      s |= c.symbols()
      return s
    
class Or(Sentence): 
  def __init__(self, *disjuncts):
    self.disjuncts = list(disjuncts)
  def __repr__(self): 
    return "Or(" + ", ".join(map(str, self.disjuncts)) + ")"
  def __evaluate__(self, model):
    return any(d.evaluate(model) for d in self.disjuncts)
  def symbols(self):
    if not self.disjuncts:
      return set()
    for d in self.disjuncts: 
      s |= d.symbols()
      return s
    
class Implication(Sentence):
  def __init__(self, antecedent, consequent):
    self.antecedent, self.consequent = antecedent, consequent
  def __repr__(self):
    return f"Implication({self.antecedent}, {self.consequent})"
  def evaluate(self, model):
    return (not self.antecedent.evaluate(model)) or self.consequent.evaluate(model)
  def symbols(self):
    return self.antecedent.symbols() | self.consequent.symbols()
  
def model_check(knowledge, symbols, query):
  def check_all(kb, q, model): 
    if not symbols:
      # Entailment condition: if KB is true, query must be true
      return (not kb.evaluate(model)) or q.evaluate(model)
    remaining = set(symbols)
    p = remaining.pop()
    # Create copies of the current model with cases for an unassigned symbol
    m_true = dict(model); m_true[p] = True
    m_false = dict(model); m_false[p]= False
    return check_all(kb, q, remaining, m_true) and check_all(kb, q, remaining, m_false)

  all_syms = knowledge.symbols() | query.symbols()
  return check_all(knowledge, query, all_syms, {})


  
  


